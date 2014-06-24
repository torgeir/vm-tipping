var React = require('react');
var _     = require('lodash');

var Flag  = require('./flag');

module.exports = React.createClass({

  render: function () {
    var align = this.props.align;

    var style = {};
    if (align) {
      style["float"] = align;
    }

    return (
      <span style={style}>
        <span className={'vs-home ' + this.homeclass()}>
          <Flag team={this.home()} />
          {this.home()}
        </span>
        <span className="vs-separator"> - </span>
        <span className={'vs-away ' + this.awayclass()}>
          <Flag team={this.away()} />
          {this.away()}
        </span>
      </span>
    );
  },

  home: function () {
    return this.props.home;
  },

  homeclass: function() {
    return this.props.homeclass || '';
  },

  away: function () {
    return this.props.away;
  },

  awayclass: function() {
    return this.props.awayclass || '';
  }
});
