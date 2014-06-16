var React = require('react');
var _     = require('lodash');

var Guess = require('./guess');

module.exports = React.createClass({

  render: function () {
    var match = this.match();
    var score = match.homename + ' - ' + match.awayname + ': ' + match.homegoals + ' - '  + match.awaygoals;
    var bets = _(match.bets)
    						.chain()
    						.map(b => <Guess bet={b} />)
    						.value();

    return (
			<section className='match-guesses'>
				<h1>{score}</h1>
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
