var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  render: function () {
    var bet = this.props.bet;
    var betClass = 'guess-no-outcome';

    if (bet.matchPlayed) {
      if (bet.correctResult) {
        betClass = 'guess-correct-result';
      } else if (bet.correctOutcome) {
        betClass = 'guess-correct-outcome';
      } else {
        betClass = 'guess-wrong-outcome';
      }
    }

    return (
      <li className={betClass + ' guess'}>
        <span>{bet.name}</span>
        <span>{bet.homegoals + " - " + bet.awaygoals}</span>
      </li>
    );
  }
});
