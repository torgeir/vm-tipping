var React               = require('react');
var RoutingContextMixin = require('rrouter').RoutingContextMixin;

module.exports = React.createClass({

  mixins: [RoutingContextMixin],

  render: function () {
    var fixMobileSafariIssue = { cursor: "pointer" }; // https://github.com/facebook/react/issues/1169

    var paid = (typeof this.props.user.paid == 'boolean')
      ? this.props.user.paid
      : true;

    var className = "user";
    if (!paid) {
      className += " user--paid-no";
    }

    return (
      <li>
        <a style={fixMobileSafariIssue} onClick={this.clicked}>
          {this.props.user.points} <span className={className}>{this.userHtml()}</span>
        </a>
      </li>
    );
  },

  clicked: function () {
    this.navigate("/user/" + this.props.user.id);
  },

  userHtml: function () {
    var name = this.props.user.name;
    var letters = name.split('');
    return letters.map((letter, i) => {
      var className = "user-letter-" + i;
      return <span className={className}>{letter}</span>
    });
  }

});
