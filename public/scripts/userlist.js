var React = require('react');

var User = require('./user');

module.exports = React.createClass({

  render: function () {
    var users = this.props.users;

    if (!users) {
      return (
        <p>Loading..</p>
      );
    }

    var Users = users.map(user => <User user={user} />);

    return (
      <ul>
        {Users}
      </ul>
    );
  }
});
