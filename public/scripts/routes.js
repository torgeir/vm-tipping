var React   = require('react');
var RRouter = require('rrouter');

var Api         = require('./api');
var UserList    = require('./components/userlist');
var UserResults = require('./components/userresults');
var MatchDay    = require('./components/matchday');

var Routes = RRouter.Routes;
var Route  = RRouter.Route;

var getUser    = Api.getUser.bind(Api);
var getUsers   = Api.getUsers.bind(Api);
var getMatches = Api.getMatches.bind(Api);
var getTodaysMatches = Api.getTodaysMatches.bind(Api);

module.exports = (
  <Routes>
    <Route name="index" path="/" view={UserList} usersPromise={getUsers} matchesPromise={getTodaysMatches} />
    <Route name="user" path="/user/:id" view={UserResults} userPromise={getUser} />
    <Route name="matchday" path="/matchday/:day" view={MatchDay} matchesPromise={getMatches} />
  </Routes>
);
