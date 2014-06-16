var _ = require('lodash');
var React = require('react');
var Link  = require('rrouter').Link;

var Menu  = require('./menu');
var GuessList = require('./guesslist');

module.exports = React.createClass({

  render: function () {

    var day = Number(this.props.day);
    var prev = day - 1;
    var next = day + 1;

    if (day >= 14) {
      next = day;
    }

    if (day <= 1) {
      prev = day;
    }

    if (!this.props.matches) {
      return (<div>Loading..</div>);
    }

    var matches = _(this.props.matches).chain().map(m => <GuessList match={m}/>).value();

    return (
      <section>
        <Menu />
        <Link to="matchday" day={prev}>I går</Link>
        <h1>Match day {day}</h1>
        <Link to="matchday" day={next}>I morgen</Link>
        {matches}
      </section>
    );
  }
});
