var _ = require('lodash');
var Promise = require('bluebird');

var ajax = require('./ajax');

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
        return { name: user.name, id: user.id };
      })
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

/**
 * Fetch results by user id
 */
exports.getResults = query => {
  var userId = Number(query.id);
  return usersPromise.then(users =>
    _(users)
      .chain()
      .filter(user => user.id === userId)
      .map(user => user.results)
      .first()
      .value());
};

exports.getMatches = query => {
  var startDate = new Date('Jun 12, 2014 GMT-03:00');
  var matches = {'items': [
    {'day':'Thu','date': startDate,'time':'17:00','from':'Brasil','to':'Kroatia','place':'Sao Paulo', homegoals: 3, awaygoals: 1, outcome: 'h'},
    {'day':'Fri','date': new Date('Jun 13, 2014 GMT-03:00'),'time':'13:00','from':'Mexico','to':'Kamerun','place':'Natal', homegoals: 1, awaygoals: 0, outcome: 'h'},
    {'day':'Fri','date': new Date('Jun 13, 2014 GMT-03:00'),'time':'16:00','from':'Spania','to':'Nederland','place':'Salvador', homegoals: 1, awaygoals: 5, outcome: 'b'},
    {'day':'Fri','date': new Date('Jun 13, 2014 GMT-03:00'),'time':'19:00','from':'Chile','to':'Australia','place':'Curitiba', homegoals: 3, awaygoals: 1, outcome: 'h'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'13:00','from':'Colombia','to':'Hellas','place':'Belo Horizonte', homegoals: 3, awaygoals: 0, outcome: 'h'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'22:00','from':'Elfenbenskysten','to':'Japan','place':'Recife', homegoals: 2, awaygoals: 1, outcome: 'h'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'16:00','from':'Uruguay','to':'Costa Rica','place':'Fortaleza', homegoals: 1, awaygoals: 3, outcome: 'b'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'19:00','from':'England','to':'Italia','place':'Manaus', homegoals: 1, awaygoals: 2, outcome: 'b'},
    {'day':'Sun','date': new Date('Jun 15, 2014 GMT-03:00'),'time':'13:00','from':'Sveits','to':'Ecuador','place':'Brasilia', homegoals: 2, awaygoals: 1, outcome: 'h'},
    {'day':'Sun','date': new Date('Jun 15, 2014 GMT-03:00'),'time':'16:00','from':'Frankrike','to':'Honduras','place':'Porto Alegre', homegoals: 3, awaygoals: 0, outcome: 'h'},
    {'day':'Sun','date': new Date('Jun 15, 2014 GMT-03:00'),'time':'19:00','from':'Argentina','to':'Bosnia-Hercegovina','place':'Rio De Janeiro', homegoals: 2, awaygoals: 1, outcome: 'h'},
    {'day':'Mon','date': new Date('Jun 16, 2014 GMT-03:00'),'time':'13:00','from':'Tyskland','to':'Portugal','place':'Salvador', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Mon','date': new Date('Jun 16, 2014 GMT-03:00'),'time':'16:00','from':'Iran','to':'Nigeria','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Mon','date': new Date('Jun 16, 2014 GMT-03:00'),'time':'19:00','from':'Ghana','to':'USA','place':'Natal', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Tue','date': new Date('Jun 17, 2014 GMT-03:00'),'time':'13:00','from':'Belgia','to':'Algerie','place':'Belo Horizonte', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Tue','date': new Date('Jun 17, 2014 GMT-03:00'),'time':'16:00','from':'Brasil','to':'Mexico','place':'Fortaleza', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Tue','date': new Date('Jun 17, 2014 GMT-03:00'),'time':'19:00','from':'Russland','to':'Sør-Korea','place':'Cuiaba', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Wed','date': new Date('Jun 18, 2014 GMT-03:00'),'time':'13:00','from':'Australia','to':'Nederland','place':'Porto Alegre', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Wed','date': new Date('Jun 18, 2014 GMT-03:00'),'time':'19:00','from':'Kamerun','to':'Kroatia','place':'Manaus', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Wed','date': new Date('Jun 18, 2014 GMT-03:00'),'time':'16:00','from':'Spania','to':'Chile','place':'Rio De Janeiro', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Thu','date': new Date('Jun 19, 2014 GMT-03:00'),'time':'13:00','from':'Colombia','to':'Elfenbenskysten','place':'Brasilia', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Thu','date': new Date('Jun 19, 2014 GMT-03:00'),'time':'16:00','from':'Uruguay','to':'England','place':'Sao Paulo', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Thu','date': new Date('Jun 19, 2014 GMT-03:00'),'time':'19:00','from':'Japan','to':'Hellas','place':'Natal', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Fri','date': new Date('Jun 20, 2014 GMT-03:00'),'time':'13:00','from':'Italia','to':'Costa Rica','place':'Recife', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Fri','date': new Date('Jun 20, 2014 GMT-03:00'),'time':'16:00','from':'Sveits','to':'Frankrike','place':'Salvador', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Fri','date': new Date('Jun 20, 2014 GMT-03:00'),'time':'19:00','from':'Honduras','to':'Ecuador','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Sat','date': new Date('Jun 21, 2014 GMT-03:00'),'time':'13:00','from':'Argentina','to':'Iran','place':'Belo Horizonte', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Sat','date': new Date('Jun 21, 2014 GMT-03:00'),'time':'16:00','from':'Tyskland','to':'Ghana','place':'Fortaleza', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Sat','date': new Date('Jun 21, 2014 GMT-03:00'),'time':'19:00','from':'Nigeria','to':'Bosnia-Hercegovina','place':'Cuiaba', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Sun','date': new Date('Jun 22, 2014 GMT-03:00'),'time':'16:00','from':'Sør-Korea','to':'Algerie','place':'Porto Alegre', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Sun','date': new Date('Jun 22, 2014 GMT-03:00'),'time':'19:00','from':'USA','to':'Portugal','place':'Manaus', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Sun','date': new Date('Jun 22, 2014 GMT-03:00'),'time':'13:00','from':'Belgia','to':'Russland','place':'Rio De Janeiro', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'13:00','from':'Australia','to':'Spania','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'13:00','from':'Nederland','to':'Chile','place':'Sao Paulo', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'17:00','from':'Kamerun','to':'Brasil','place':'Brasilia', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'17:00','from':'Kroatia','to':'Mexico','place':'Recife', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'13:00','from':'Italia','to':'Uruguay','place':'Natal', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'13:00','from':'Costa Rica','to':'England','place':'Belo Horizonte', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'17:00','from':'Japan','to':'Colombia','place':'Cuiaba', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'17:00','from':'Hellas','to':'Elfenbenskysten','place':'Fortaleza', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'13:00','from':'Nigeria','to':'Argentina','place':'Porto Alegre', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'13:00','from':'Bosnia-Hercegovina','to':'Iran','place':'Salvador', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'17:00','from':'Honduras','to':'Sveits','place':'Manaus', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'17:00','from':'Ecuador','to':'Frankrike','place':'Rio De Janeiro', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'13:00','from':'USA','to':'Tyskland','place':'Recife', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'13:00','from':'Portugal','to':'Ghana','place':'Brasilia', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'17:00','from':'Sør-Korea','to':'Belgia','place':'Sao Paulo', homegoals: 0, awaygoals: 0, outcome: ''},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'17:00','from':'Algerie','to':'Russland','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''}
  ]};

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
