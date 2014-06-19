var React = require('react');
var _     = require('lodash');

var Match = require('./match');
var Guess = require('./guess');
var api   = require('../api');

var URL = "http://img.fifa.com/images/flags/4/%s.png";

module.exports = React.createClass({

  render: function () {

    return (
      <img src={this.imageUrl()} alt={this.team()} title={this.team()} className="flag"/>
    );
  },

  imageUrl: function () {
    return URL.replace("%s", api.shortname(this.team()));
  },

  team: function () {
    return this.props.team;
  }
});
