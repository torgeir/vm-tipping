var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  render: function () {
    var bet = this.props.bet;
    var betClass = 'no-outcome';

    if (bet.matchPlayed) {
      if (bet.correctResult) {
        betClass = 'correct-result';
      } else if (bet.correctOutcome) {
        betClass = 'correct-outcome';
      } else {
        betClass = 'wrong-outcome';
      }
    }

    return (
      <li className={betClass + ' bet'}>
        <span>{bet.name}</span>
        <span>{bet.homegoals + " - " + bet.awaygoals}</span>
      </li>
    );
  }
});
