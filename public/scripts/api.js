var _ = require('lodash');
var Promise = require('bluebird');

var ajax = require('./ajax');
var matches = require('./data');

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
      .chain()
      .map(user => {
        user.points = 0;
        var results = user.results;
        _(results.group)
          .chain()
          .keys()
          .each(groupId => {

            var group = results.group[groupId];
           
            _(group)
              .chain()
              .keys()
              .each(matchId => {
                var match = group[matchId];
                var resultMatch = _(matches.items).find(m => m.id == matchId);
                updateMatchWithResults(match, resultMatch);
                user.points += match.points;
              });           
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

/**
 * Fetch matches for today, with the bets of every player.
 */
exports.getTodaysMatches = query => {
  return exports.getMatches({ day: 6 });
}

/**
 * Fetch matches for a given day, with the bets of every player.
 */
exports.getMatches = query => {  
  var startDate = new Date('Jun 12, 2014 GMT-03:00');  
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
      id: user.id,
      name: user.name,
      homename: match.homename,
      awayname: match.awayname,
      homegoals: match.homegoals,
      awaygoals: match.awaygoals,
      outcome: outcome                           
    }
  }

  return usersPromise.then(users => {

    var results = 
      _(users) 
        .chain()
        .map(user => {

          var groupPlay = user.results.group;                      
          return _(groupPlay)
            .chain()
            .keys()
            .map(groupId => {

              var group = groupPlay[groupId]; 
              return _(group)
                .chain()
                .keys()
                .map(matchId => group[matchId])
                .map(match => createBets(user, match)) 
                .value() 
            })                        
            .value()
        })
        .flatten()
        .value();

    return _(matches.items)
      .chain()
      .filter(m => m.date.getTime() === date.getTime())
      .map(m => {
        return {
          homename: m.from,
          awayname: m.to,
          homegoals: m.homegoals,
          awaygoals: m.awaygoals,
          bets: _(results)
                  .chain()
                  .filter(r => r.homename == m.from && r.awayname == m.to)
                  .map(b => {
                    b.matchPlayed = (m.outcome !== '');
                    b.correctOutcome = (b.outcome === m.outcome);
                    b.correctResult = (b.homegoals === m.homegoals && b.awaygoals == m.awaygoals);
                    return b;
                  })
                  .value()
        }
      })
      .value()
  });
}
