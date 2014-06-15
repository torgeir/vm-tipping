var React = require('react');
var _     = require('lodash');

var Match = require('./match');

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
      <ul>
        {matches}
      </ul>
    );
  },

  group: function () {
    return this.props.group;
  }
});
