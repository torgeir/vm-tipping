var React = require('react');
var Link  = require('rrouter').Link;

module.exports = React.createClass({

  render: function () {
    return (
      <Link to="index">Tilbake</Link>
    );
  }
});
