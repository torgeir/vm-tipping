var React = require('react');
var _     = require('lodash');

var Guess   = require('./guess');
var Score   = require('./score');
var Flag    = require('./flag');
var Vs      = require('./vs');
var Funfact = require('../funfacts');


module.exports = React.createClass({
  render: function () {
    var match = this.match();
    var day = this.day();

    var bets =
      _(match.bets)
        .chain()
        .map(b => <Guess bet={b} day={day} />)
        .value();

    return (
      <section className='match-guesses'>
        <h1>
          <Vs home={match.homename} away={match.awayname} align="left"/>
          <Score match={match} align="right" />
        </h1>
        <ul>
          {bets}
        </ul>
        <p><Flag team={match.homename} /> {Funfact[match.homename]}</p>
        <p><Flag team={match.awayname} /> {Funfact[match.awayname]}</p>
      </section>
    );
  },

  match: function () {
    return this.props.match;
  },

  day: function () {
    return this.props.day;
  }
});
