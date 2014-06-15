var React   = require('react');
var RRouter = require('rrouter');

var UserList    = require('./userlist');
var UserResults = require('./userresults');
var Api         = require('./api');

var Routes = RRouter.Routes;
var Route  = RRouter.Route;

var getUser    = Api.getUser.bind(Api);
var getUsers   = Api.getUsers.bind(Api);
var getResults = Api.getResults.bind(Api);

module.exports = (
  <Routes>
    <Route name="index" path="/" view={UserList} usersPromise={getUsers} />
    <Route name="user" path="/user/:id" view={UserResults} userPromise={getUser} resultsPromise={getResults} />
  </Routes>
);
