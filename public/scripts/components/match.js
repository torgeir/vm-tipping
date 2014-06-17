var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({

  render: function () {
    var match = this.match();

    var matchClass = 'no-outcome';

    if (match.matchPlayed) {
      if (match.correctResult) {
        matchClass = 'correct-result';
      } else if (match.correctOutcome) {
        matchClass = 'correct-outcome';
      } else {
        matchClass = 'wrong-outcome';
      }
    }

    var matchResult = '(' + (match.actualHomegoals || 0) + ' - ' + (match.actuallAwaygoals || 0) + ')';

    return (
      <tr className={matchClass}>
        <td>{match.homename + ' - ' + match.awayname}</td>
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
