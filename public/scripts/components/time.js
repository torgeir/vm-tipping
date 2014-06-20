var React = require('react');
var _     = require('lodash');

var Match = require('./match');
var Guess = require('./guess');
var api   = require('../api');

function startTime (time) {
  return api.startTime(time);
}

function pad (time) {
  if (time < 10) {
    return time + '0';
  }
  return time;
}

module.exports = React.createClass({

  render: function () {

    return (
      <span>{this.hh()}:{this.mm()}</span>
    );
  },

  time: function () {
    console.log(this.props.match);
    return this.props.match.time;
  },

  hh: function () {
    return pad(startTime(this.time()).getHours());
  },

  mm: function () {
    return pad(startTime(this.time()).getMinutes());
  }

});
