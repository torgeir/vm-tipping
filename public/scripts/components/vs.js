var React = require('react');
var _     = require('lodash');

var Flag  = require('./flag');

module.exports = React.createClass({

  render: function () {

    return (
      <span>
        <Flag team={this.home()} />
        {this.home()} -
        <Flag team={this.away()} />
        {this.away()}
      </span>
    );
  },

  home: function () {
    return this.props.home;
  },

  away: function () {
    return this.props.away;
  }
});
