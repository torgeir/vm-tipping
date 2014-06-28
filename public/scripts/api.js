var _ = require('lodash');
var Promise = require('bluebird');

var ajax = require('./ajax');
var matches = require('./data');
var eventbus = require('./eventbus');

// Fetch raw data immediately
var rawUserDataPromise = () => ajax.get("http://dev.wa.gd/json");

// Fetch users and results data
// Parses data into js objects as soon as possible
//
// data is newline separated lists of json { name: ..., results: [] }
var usersPromise = rawUserDataPromise().then(res => {
  var text = res.text;
  var jsonLines = text.split("\n");

  var ID = 1;

  var objects =
    _(jsonLines)
      .chain()
      // remove empty lines
      .filter(line => line.length !== 0)
      // parse to objects
      .map(JSON.parse)
      // skip duplicates
      .unique("name")
      // remove undefined users
      .filter(userData => userData.name !== "undefined")
      // sort
      .sortBy("name")
      // add an id
      .map(userData => {
        userData.id = ID++;
        return userData;
      })
      .value();

  return objects;
});

/**
 * Fetch users
 */
exports.getUsers = () => {
  return usersPromise.then(users =>
    _(users)
      .map(user => {
        user.points = 0;
        user.paid = matches.betaling[user.name];
        var results = user.results;

        // Group
        _(results.group)
          .keys()
          .each(groupId => {

            var group = results.group[groupId];

            _(group)
              .keys()
              .each(matchId => {
                var match = group[matchId];
                var resultMatch = _(matches.group).find(m => m.id == matchId);
                updateMatchWithResults(match, resultMatch);
                user.points += match.points;
              });
          })
          .value();

        // Eight - finals. Same method can be used for quarter and semi final.
        _(matches.eight)
          .groupBy( (obj, i) => Math.floor(i/2))
          .each(g => {
            var resultMatch1 = g[0];
            var resultMatch2 = g[1];
            var guessMatch1 = results.eight[resultMatch1.id];
            var guessMatch2 = results.eight[resultMatch2.id];
            updateMatchWithFinalResults(guessMatch1, guessMatch2, resultMatch1, resultMatch2, 15, 5);
            user.points += guessMatch1.points;
            user.points += guessMatch2.points;
          })
          .value();

        // Kvart - finals. Same method can be used for quarter and semi final.
        _(matches.kvart)
          .groupBy( (obj, i) => Math.floor(i/2))
          .each(g => {
            var resultMatch1 = g[0];
            var resultMatch2 = g[1];
            var guessMatch1 = results.kvart[resultMatch1.id];
            var guessMatch2 = results.kvart[resultMatch2.id];
            updateMatchWithFinalResults(guessMatch1, guessMatch2, resultMatch1, resultMatch2, 20, 10);
            user.points += guessMatch1.points;
            user.points += guessMatch2.points;
          })
          .value();

        return user;
      })
      .sortBy(user => user.points * -1)
      .value());
};

/**
 * Fetch user by id
 */
exports.getUser = query => {
  var userId = Number(query.id);
  return exports.getUsers().then(users =>
    _(users)
      .chain()
      .filter(user => user.id === userId)
      .first()
      .value());
};

var updateMatchWithResults = (match, resultMatch) => {
  var guessedOutcome = 'u';
  if (match.homegoals > match.awaygoals) {
    guessedOutcome = 'h';
  } else if(match.awaygoals > match.homegoals) {
    guessedOutcome = 'b';
  }

  match.outcome = resultMatch.outcome;
  match.matchPlayed = resultMatch.outcome !== '';
  match.correctResult = match.matchPlayed && resultMatch.homegoals === match.homegoals && resultMatch.awaygoals === match.awaygoals;
  match.correctOutcome =  match.matchPlayed && resultMatch.outcome === guessedOutcome;
  match.actualHomegoals = resultMatch.homegoals;
  match.actualAwaygoals = resultMatch.awaygoals;

  match.points = 0;
  if (match.correctResult) {
    match.points = 20;
  } else if (match.correctOutcome) {
    match.points = 10;
  }
}

var updateMatchWithFinalResults = (match1, match2, resultMatch1, resultMatch2, pointsCorrectPosition, pointsCorrectTeam) => {
  var calculatePoints = (match, result1, result2) => {
    match.points = 0; // NB resets points.
    if (match.homename == result1.from) {
      match.homeclass = 'correct-team-correct-position';
      match.points += pointsCorrectPosition;
    } else if (match.homename == result2.to) {
      match.homeclass = 'correct-team-wrong-position';
      match.points += pointsCorrectTeam;
    }

    if (match.awayname == result1.to) {
      match.awayclass = 'correct-team-correct-position';
      match.points += pointsCorrectPosition;
    } else if (match.awayname == result2.from) {
      match.awayclass = 'correct-team-wrong-position';
      match.points += pointsCorrectTeam;
    }
  }

  calculatePoints(match1, resultMatch1, resultMatch2);
  calculatePoints(match2, resultMatch2, resultMatch1);
}

// set time to 00:00 to ease calculating current match day
var START_DATE_FORMAT = 'Jun 12, 2014 00:00:00 GMT-03:00';
var startDate = new Date(START_DATE_FORMAT);
startDate.setHours(0, 0);

/**
 * Get match day number
 */
var getMatchDay = exports.getMatchDay = () => {
  var today = new Date();
  return parseInt((today - startDate) / (60 * 60 * 24 * 1000)) + 1;
};


/**
 * Fetch matches for today, with the bets of every player.
 */
var getTodaysMatches = exports.getTodaysMatches = query => {
  var day = getMatchDay();
  return exports.getMatches({ day: day });
};

/**
 * Fetch matches for a given day, with the bets of every player.
 */
exports.getMatches = query => {
  var day = Number(query.day) - 1;
  var date = new Date(startDate.getTime() + (24 * 3600 * 1000 * day));

  var createBets = function(user, match) {
    var outcome = 'u';
    if (match.homegoals > match.awaygoals) {
      outcome = 'h';
    } else if (match.homegoals < match.awaygoals) {
      outcome = 'b';
    }

    return {
      userId: user.id,
      name: user.name,
      id: match.id,
      homename: match.homename,
      awayname: match.awayname,
      homegoals: match.homegoals,
      awaygoals: match.awaygoals,
      outcome: outcome
    }
  }

  var createResultsForMatches = function(matches, user) {
    return _(matches)
      .chain()
      .keys()
      .map(matchId => {
        var match = matches[matchId]
        match.id = matchId;
        return createBets(user, match);
      })
      .value();
  }

  return usersPromise.then(users => {

    var results =
      _(users)
        .chain()
        .map(user => {

          var groupPlay = user.results.group;
          var groupResults = _(groupPlay)
            .chain()
            .keys()
            .map(groupId => {
              var group = groupPlay[groupId];
              return createResultsForMatches(group, user);
            })
            .value()

          var eightResults = createResultsForMatches(user.results.eight, user);
          var kvartResults = createResultsForMatches(user.kvart, user);
          return _.union(groupResults, eightResults, kvartResults);
        })
        .flatten()
        .value();

    return _(matches.group)
      .union(matches.eight)
      .union(matches.kvart)
      .filter(m => {
        var isSameMonthAndYear = m.date.getFullYear() === date.getFullYear() && m.date.getMonth() === date.getMonth();
        var isMidnightGame = m.date.getHours() == '00';
        var isMidnightGameTomorrow = isSameMonthAndYear && m.date.getDate() == (date.getDate() + 1) && isMidnightGame;
        var isToday = isSameMonthAndYear && m.date.getDate() == date.getDate() && !isMidnightGame;
        return isToday || isMidnightGameTomorrow;
      })
      .map(m => {
        m.homename = m.from;
        m.awayname = m.to;
        m.bets = _(results)
                    .filter(r => r.id == m.id)
                    .map(b => {
                      b.matchPlayed = (m.outcome !== '');
                      b.correctOutcome = (b.outcome === m.outcome);
                      b.correctResult = (b.homegoals === m.homegoals && b.awaygoals == m.awaygoals);
                      b.correctHomeTeam = (b.homename === m.homename);
                      b.correctAwayTeam = (b.awayname === m.awayname);
                      return b;
                    })
                    .value();
        return m;
      })
      .value()
  });
};

function translate (team) {
  var translation = matches.translations[team];
  if (!translation) console.error("no translation for team: ", team);
  return translation;
}

/**
 * Looks up english name from norwegian name
 */
exports.translate = team => {
  var translation = translate(team);
  return translation.englishname;
};

/**
 * Looks up shortname from norwegian name
 */
exports.shortname = team => {
  var translation = translate(team);
  return translation.shortname;
};

/**
 * Tell if a match has passed
 */
var hasPassed = exports.hasPassed = match => {
  var duration = (45 * 2 + 25);
  var durationMs = duration * 60 * 1000;
  var matchstartWithDuration = (match.date.getTime() + durationMs);
  return new Date() > matchstartWithDuration;
};

/**
 * Tell if a match has started
 */
var hasStarted = exports.hasStarted = match => {
  return new Date() > match.date;
};

/**
 * Tell if a match is ongoing
 */
var isOngoing = exports.isOngoing = match => {
  return hasStarted(match) && !hasPassed(match);
};

/**
 * Fetch live scores for ongoing match
 */
var fetchLiveResult = (match, currentMatches) => {
  if (!isOngoing(match)) {
    return Promise.reject(new Error('match is not ongoing ' + match.id));
  }

  var englishHomeTeam = translate(match.from);
  var englishAwayTeam = translate(match.to);

  function isCurrentMatch (result) {
    return result.home_team.code === englishHomeTeam.shortname &&
           result.away_team.code === englishAwayTeam.shortname;
  }

  return currentMatches
    .then(res => res.text)
    .then(JSON.parse)
    .then(function (results) {
      return _.chain(results)
        .filter(isCurrentMatch)
        .first()
        .value();
    })
    .then(function (result) {
      if (!result) {
        throw new Error("got no live results for this match " + JSON.stringify(match));
      }
      match.homegoals = result.home_team.goals;
      match.awaygoals = result.away_team.goals;

      match.outcome = 'u';
      if (match.homegoals > match.awaygoals) {
        match.outcome = 'h';
      } else if(match.homegoals < match.awaygoals) {
        match.outcome = 'b';
      }

      return match;
    })
    .catch(function () {
      return Promise.reject('failed to fetch live scores for match');
    });
};

(function updateMatches() {
  var currentMatches = ajax.get("http://worldcup.sfg.io/matches/current");
  // TODO include other finals
  _(matches.group)
    .filter(isOngoing)
    .each(match => {
      fetchLiveResult(match, currentMatches)
        .catch(err => {})
        .then(() => eventbus.emit('reload'));
    });
  setTimeout(updateMatches, 20 * 1000);
})();
