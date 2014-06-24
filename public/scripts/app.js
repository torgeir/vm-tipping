var React     = window.React = require('react'); // window.React loads chrome react devtools
var RRouter   = require('rrouter');
var FastClick = require('fastclick');

var appEl = document.querySelector("#app");

FastClick(appEl);

React.initializeTouchEvents(true);

var Routes = require('./routes');
var routing = RRouter.start(Routes, view =>
  React.renderComponent(view, appEl));

var eventbus = require('./eventbus');
eventbus.on('reload', () => routing.update());
