var React = require('react');
var _     = require('lodash');

var Vs        = require('./vs');

module.exports = React.createClass({
  render: function () {
    var bet = this.props.bet;
    var day = this.props.day;

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

    if (day > 16) {
      return (
        <li className={betClass + ' guess'}>
          <span>{bet.name}</span>
          <span> ({bet.homename} - {bet.awayname})</span>
          <span className="guess-score">{bet.homegoals + " - " + bet.awaygoals}</span>
        </li>
      );
    } else {
      return (
        <li className={betClass + ' guess'}>
          <span>{bet.name}</span>
          <span className="guess-score">{bet.homegoals + " - " + bet.awaygoals}</span>
        </li>
      );
    }
  }
});
