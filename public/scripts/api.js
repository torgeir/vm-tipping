var _ = require('lodash');


var ajax = require('./ajax');

// Fetch raw data immediately
var rawUserDataPromise = () => ajax.get("http://dev.wa.gd/json");

// Parse data into js objects as soon as possible
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

var getUsers = exports.getUsers = () => {
  return usersPromise.then(users =>
    _(users)
      .chain()
      .map(user => {
        return { name: user.name, id: user.id };
      })
      .value());
};

exports.getUser = query => {
  var userId = Number(query.id);
  return getUsers().then(users =>
    _(users)
      .chain()
      .filter(user => user.id === userId)
      .first()
      .value());
};

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
