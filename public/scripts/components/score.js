var React = require('react');
var _     = require('lodash');

var api = require('../api');

module.exports = React.createClass({

  render: function () {
    var align = this.props.align;

    var style = {};
    if (align) {
      style["float"] = align;
    }

    return (
      <span style={style}>
        <span className="score-home">{this.match().homegoals}</span>
        <span className="score-separator"> - </span>
        <span className="score-away">{this.match().awaygoals}</span>
      </span>
    );
  },

  match: function () {
    return this.props.match;
  }
});
