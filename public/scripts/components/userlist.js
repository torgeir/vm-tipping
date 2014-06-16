var React = require('react');
var Link  = require('rrouter').Link;

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
      <section>
        <Link to="matchday" day="5">Se dagens kamper</Link>
        <ul>
          {Users}
        </ul>
      </section>
    );
  }
});
