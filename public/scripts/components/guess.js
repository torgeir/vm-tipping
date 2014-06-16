var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  render: function () {
    var bet = this.props.bet;

    return (
      <li>{bet.name} ({bet.homegoals + " - " + bet.awaygoals})</li>
    );
  }
});
