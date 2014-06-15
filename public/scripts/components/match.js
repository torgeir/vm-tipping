var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({

  render: function () {
    var match = this.match();
    var score = match.homename + " - " + match.awayname + ": " + match.homegoals + " - " + match.awaygoals;
    return (<li>{score}</li>);
  },

  match: function () {
    return this.props.match;
  }
});
