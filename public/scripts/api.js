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
    {'day':'Thu','date': startDate,'time':'17:00','from':'Brazil','to':'Croatia','place':'Sao Paulo'},
    {'day':'Fri','date': new Date('Jun 13, 2014 GMT-03:00'),'time':'13:00','from':'Mexico','to':'Cameroon','place':'Natal'},
    {'day':'Fri','date': new Date('Jun 13, 2014 GMT-03:00'),'time':'16:00','from':'Spain','to':'Netherlands','place':'Salvador'},
    {'day':'Fri','date': new Date('Jun 13, 2014 GMT-03:00'),'time':'19:00','from':'Chile','to':'Australia','place':'Curitiba'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'13:00','from':'Colombia','to':'Greece','place':'Belo Horizonte'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'22:00','from':'Côte d\'Ivoire','to':'Japan','place':'Recife'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'16:00','from':'Uruguay','to':'Costa Rica','place':'Fortaleza'},
    {'day':'Sat','date': new Date('Jun 14, 2014 GMT-03:00'),'time':'19:00','from':'England','to':'Italy','place':'Manaus'},
    {'day':'Sun','date': new Date('Jun 15, 2014 GMT-03:00'),'time':'13:00','from':'Switzerland','to':'Ecuador','place':'Brasilia'},
    {'day':'Sun','date': new Date('Jun 15, 2014 GMT-03:00'),'time':'16:00','from':'France','to':'Honduras','place':'Porto Alegre'},
    {'day':'Sun','date': new Date('Jun 15, 2014 GMT-03:00'),'time':'19:00','from':'Argentina','to':'Bosnia-Herzegovina','place':'Rio De Janeiro'},
    {'day':'Mon','date': new Date('Jun 16, 2014 GMT-03:00'),'time':'13:00','from':'Germany','to':'Portugal','place':'Salvador'},
    {'day':'Mon','date': new Date('Jun 16, 2014 GMT-03:00'),'time':'16:00','from':'Iran','to':'Nigeria','place':'Curitiba'},
    {'day':'Mon','date': new Date('Jun 16, 2014 GMT-03:00'),'time':'19:00','from':'Ghana','to':'USA','place':'Natal'},
    {'day':'Tue','date': new Date('Jun 17, 2014 GMT-03:00'),'time':'13:00','from':'Belgium','to':'Algeria','place':'Belo Horizonte'},
    {'day':'Tue','date': new Date('Jun 17, 2014 GMT-03:00'),'time':'16:00','from':'Brazil','to':'Mexico','place':'Fortaleza'},
    {'day':'Tue','date': new Date('Jun 17, 2014 GMT-03:00'),'time':'19:00','from':'Russia','to':'Korea Republic','place':'Cuiaba'},
    {'day':'Wed','date': new Date('Jun 18, 2014 GMT-03:00'),'time':'13:00','from':'Australia','to':'Netherlands','place':'Porto Alegre'},
    {'day':'Wed','date': new Date('Jun 18, 2014 GMT-03:00'),'time':'19:00','from':'Cameroon','to':'Croatia','place':'Manaus'},
    {'day':'Wed','date': new Date('Jun 18, 2014 GMT-03:00'),'time':'16:00','from':'Spain','to':'Chile','place':'Rio De Janeiro'},
    {'day':'Thu','date': new Date('Jun 19, 2014 GMT-03:00'),'time':'13:00','from':'Colombia','to':'Côte d\'Ivoire','place':'Brasilia'},
    {'day':'Thu','date': new Date('Jun 19, 2014 GMT-03:00'),'time':'16:00','from':'Uruguay','to':'England','place':'Sao Paulo'},
    {'day':'Thu','date': new Date('Jun 19, 2014 GMT-03:00'),'time':'19:00','from':'Japan','to':'Greece','place':'Natal'},
    {'day':'Fri','date': new Date('Jun 20, 2014 GMT-03:00'),'time':'13:00','from':'Italy','to':'Costa Rica','place':'Recife'},
    {'day':'Fri','date': new Date('Jun 20, 2014 GMT-03:00'),'time':'16:00','from':'Switzerland','to':'France','place':'Salvador'},
    {'day':'Fri','date': new Date('Jun 20, 2014 GMT-03:00'),'time':'19:00','from':'Honduras','to':'Ecuador','place':'Curitiba'},
    {'day':'Sat','date': new Date('Jun 21, 2014 GMT-03:00'),'time':'13:00','from':'Argentina','to':'Iran','place':'Belo Horizonte'},
    {'day':'Sat','date': new Date('Jun 21, 2014 GMT-03:00'),'time':'16:00','from':'Germany','to':'Ghana','place':'Fortaleza'},
    {'day':'Sat','date': new Date('Jun 21, 2014 GMT-03:00'),'time':'19:00','from':'Nigeria','to':'Bosnia-Herzegovina','place':'Cuiaba'},
    {'day':'Sun','date': new Date('Jun 22, 2014 GMT-03:00'),'time':'16:00','from':'Korea Republic','to':'Algeria','place':'Porto Alegre'},
    {'day':'Sun','date': new Date('Jun 22, 2014 GMT-03:00'),'time':'19:00','from':'USA','to':'Portugal','place':'Manaus'},
    {'day':'Sun','date': new Date('Jun 22, 2014 GMT-03:00'),'time':'13:00','from':'Belgium','to':'Russia','place':'Rio De Janeiro'},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'13:00','from':'Australia','to':'Spain','place':'Curitiba'},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'13:00','from':'Netherlands','to':'Chile','place':'Sao Paulo'},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'17:00','from':'Cameroon','to':'Brazil','place':'Brasilia'},
    {'day':'Mon','date': new Date('Jun 23, 2014 GMT-03:00'),'time':'17:00','from':'Croatia','to':'Mexico','place':'Recife'},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'13:00','from':'Italy','to':'Uruguay','place':'Natal'},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'13:00','from':'Costa Rica','to':'England','place':'Belo Horizonte'},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'17:00','from':'Japan','to':'Colombia','place':'Cuiaba'},
    {'day':'Tue','date': new Date('Jun 24, 2014 GMT-03:00'),'time':'17:00','from':'Greece','to':'Côte d\'Ivoire','place':'Fortaleza'},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'13:00','from':'Nigeria','to':'Argentina','place':'Porto Alegre'},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'13:00','from':'Bosnia-Herzegovina','to':'Iran','place':'Salvador'},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'17:00','from':'Honduras','to':'Switzerland','place':'Manaus'},
    {'day':'Wed','date': new Date('Jun 25, 2014 GMT-03:00'),'time':'17:00','from':'Ecuador','to':'France','place':'Rio De Janeiro'},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'13:00','from':'USA','to':'Germany','place':'Recife'},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'13:00','from':'Portugal','to':'Ghana','place':'Brasilia'},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'17:00','from':'Korea Republic','to':'Belgium','place':'Sao Paulo'},
    {'day':'Thu','date': new Date('Jun 26, 2014 GMT-03:00'),'time':'17:00','from':'Algeria','to':'Russia','place':'Curitiba'},
  ]};

  var day = Number(query.day) - 1;    
  var date = new Date(startDate.getTime() + (24 * 3600 * 1000 * day));

  return Promise.resolve(
          _(matches.items)
            .chain()
            .filter(m => m.date.getTime() === date.getTime())
            .map(m => {
              return {
                homename: m.from,
                awayname: m.to,
                homegoals: 0,
                awaygoals: 0
              }
            })
            .value()
          );
}
