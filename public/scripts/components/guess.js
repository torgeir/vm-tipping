var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  render: function () {
    var bet = this.props.bet;
    
    var betClass = 'wrong-outcome';    
    if (bet.correctResult) {
      betClass = 'correct-result';
    } else if (bet.correctOutcome) {
      betClass = 'correct-outcome';
    }

    return (
      <li className={betClass}>{bet.name} ({bet.homegoals + " - " + bet.awaygoals})</li>
    );
  }
});
