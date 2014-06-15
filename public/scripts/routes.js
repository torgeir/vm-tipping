var React   = require('react');
var RRouter = require('rrouter');

var Api         = require('./api');
var UserList    = require('./components/userlist');
var UserResults = require('./components/userresults');

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
