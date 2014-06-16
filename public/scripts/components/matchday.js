var _ = require('lodash');
var React = require('react');
var Link  = require('rrouter').Link;

var Match = require('./match');

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

    var matches = _(this.props.matches).chain().map(m => <Match match={m}/>).value();

    return (
      <section>
        <Link to="matchday" day={prev}>Prev</Link>
        <h1>{day}</h1>
        <Link to="matchday" day={next}>Next</Link>
        {matches}
      </section>
    );
  }
});
