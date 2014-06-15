var React     = window.React = require('react'); // window.React loads chrome react devtools
var RRouter   = require('rrouter');
var FastClick = require('fastclick');

var Routes = require('./routes');

var appEl = document.querySelector("#app");

FastClick(appEl);

React.initializeTouchEvents(true);

RRouter.start(Routes, view =>
  React.renderComponent(view, appEl));
