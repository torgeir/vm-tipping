var React = require('react');
var _     = require('lodash');

var api   = require('../api');

function startTime (match) {
  return api.startTime(match);
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
      <span className="time">{this.hh()}:{this.mm()}</span>
    );
  },

  match: function () {
    return this.props.match;
  },

  hh: function () {
    return pad(this.match().date.getHours());
  },

  mm: function () {
    return pad(this.match().date.getMinutes());
  }

});
