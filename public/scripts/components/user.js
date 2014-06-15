var React               = require('react');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

module.exports = React.createClass({

  mixins: [RoutingContextMixin],

  render: function () {
    var fixMobileSafariIssue = { cursor: "pointer" }; // https://github.com/facebook/react/issues/1169

    return (
      <li>
        <a style={fixMobileSafariIssue} onClick={this.clicked}>
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
