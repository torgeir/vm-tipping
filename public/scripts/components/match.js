var React = require('react');
var _     = require('lodash');

var Vs = require('./vs');

module.exports = React.createClass({

  render: function () {
    var match = this.match();

    var matchClass = 'guess-no-outcome';

    if (match.matchPlayed) {
      if (match.correctResult) {
        matchClass = 'guess-correct-result';
      } else if (match.correctOutcome) {
        matchClass = 'guess-correct-outcome';
      } else {
        matchClass = 'guess-wrong-outcome';
      }
    }

    var matchResult = '(' + (match.actualHomegoals || 0) + ' - ' + (match.actualAwaygoals || 0) + ')';

    return (
      <tr className={matchClass}>
        <td><Vs home={match.homename} away={match.awayname} /></td>
        <td>{matchResult}</td>
        <td>{match.points}</td>
        <td>{match.homegoals + ' - ' + match.awaygoals}</td>
      </tr>
    );
  },

  match: function () {
    return this.props.match;
  }
});
