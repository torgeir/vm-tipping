var React = require('react');
var _     = require('lodash');

var Guess = require('./guess');
var Vs    = require('./vs');


module.exports = React.createClass({

  render: function () {
    var match = this.match();
    var vs = <Vs home={match.homename} away={match.awayname} />
    var bets = _(match.bets)
    						.chain()
    						.map(b => <Guess bet={b} />)
    						.value();

    return (
			<section className='match-guesses'>
				<h1>{vs}: {match.homegoals} - {match.awaygoals}</h1>
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
