var React   = require('react');
var RRouter = require('rrouter');

var Routes = require('./routes');

React.initializeTouchEvents(true);

RRouter.start(Routes, function(view) {
  React.renderComponent(view,
    document.querySelector("#app"));
});
