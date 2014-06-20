var React = require('react');
var _     = require('lodash');

var Guess = require('./guess');
var Score = require('./score');
var Vs    = require('./vs');


module.exports = React.createClass({

  render: function () {
    var match = this.match();
    var vs = <Vs home={match.homename} away={match.awayname} align="left"/>

    var bets =
      _(match.bets)
        .chain()
        .map(b => <Guess bet={b} />)
        .value();

    return (
      <section className='match-guesses'>
        <h1>{vs} <Score match={match} align="right" /></h1>
        <ul>
          {bets}
        </ul>
      </section>
    );
  },

  match: function () {
    return this.props.match;
  }
});
