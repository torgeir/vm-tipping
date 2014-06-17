var React = require('react');
var _     = require('lodash');

var Match = require('./match');
var Guess = require('./guess');

module.exports = React.createClass({

  render: function () {
    var group = this.group();

    var matches = _(group)
      .chain()
      .keys()
      .map(key => {
        var match = group[key];
        return (
          <Match match={match}/>
        );
      })
      .value();

    return (
      <table>
        {matches}
      </table>
    );
  },

  group: function () {
    return this.props.group;
  }
});
