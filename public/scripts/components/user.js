var React               = require('react');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

module.exports = React.createClass({

  mixins: [RoutingContextMixin],

  render: function () {
    return (
      <li>
        <a onClick={this.clicked} onTouchEnd={this.clicked}>
          {this.name()}
        </a>
      </li>
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
