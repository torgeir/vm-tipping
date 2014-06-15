var React     = require('react');
var RRouter   = require('rrouter');
var FastClick = require('fastclick');

var Routes = require('./routes');

var appEl = document.querySelector("#app");

FastClick.attach(appEl);

React.initializeTouchEvents(true);

RRouter.start(Routes, view =>
  React.renderComponent(view, appEl));
