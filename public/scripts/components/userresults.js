var React = require('react');
var _     = require('lodash');

var Menu  = require('./menu');
var Group = require('./group');

module.exports = React.createClass({

  render: function () {

    if (!this.user()) {
      return (<div>Loading..</div>);
    }

    return (
      <div>
        <Menu />
        <h1>{this.name()}</h1>
        <div>
          <h2>Gruppespill</h2>
          {this.groupmatches()}
        </div>
        <div>
          <h2>Åttendedelsfinale</h2>
          <Group group={this.results().eight} />
        </div>
        <div>
          <h2>Kvartfinale</h2>
          <Group group={this.results().kvart} />
        </div>
        <div>
          <h2>Semifinale</h2>
          <Group group={this.results().semi} />
        </div>
        <div>
          <h2>Bronsefinale</h2>
          <Group group={this.results().bronsefinale} />
        </div>
        <div>
          <h2>Finale</h2>
          <Group group={this.results().finale} />
        </div>
      </div>
    );
  },

  user: function () {
    return this.props.user;
  },

  name: function () {
    return this.user().name;
  },

  results: function () {
    return this.props.results;
  },

  groupmatches: function () {
    var groups = this.results().group;
    return _(groups)
      .chain()
      .keys()
      .map(groupId => {
        var group = groups[groupId];
        return (
          <Group group={group}/>
        );
      })
      .value();
  }

});
