var React               = require('react');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

module.exports = React.createClass({

  mixins: [RoutingContextMixin],

  render: function () {
    return (
      <p onClick={this.clicked}>
        {this.name()}
      </p>
    );
  },

  clicked: function () {
    this.navigate("/user/" + this.id());
  },

  name: function () {
    return this.props.user.name;
  },

  id: function () {
    return this.props.user.id;
  }
});
