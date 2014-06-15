var React = require('react');
var _     = require('lodash');

var Menu  = require('./menu');
var Group = require('./group');

module.exports = React.createClass({

  render: function () {

    if (!this.user()) {
      return (<div>Loading..</div>);
    }

    console.log(this.results());

    return (
      <div>
        <Menu />
        <p>{this.name()}</p>
        <div>
          <p>Gruppespill</p>
          {this.groupmatches()}
        </div>
        <div>
          <p>Åttendedelsfinale</p>
          <Group group={this.results().eight} />
        </div>
        <div>
          <p>Kvartfinale</p>
          <Group group={this.results().kvart} />
        </div>
        <div>
          <p>Semifinale</p>
          <Group group={this.results().semi} />
        </div>
        <div>
          <p>Bronsefinale</p>
          <Group group={this.results().bronsefinale} />
        </div>
        <div>
          <p>Finale</p>
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
