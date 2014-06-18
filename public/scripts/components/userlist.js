var React = require('react');
var Link  = require('rrouter').Link;

var User  = require('./user');
var Match = require('./match');

module.exports = React.createClass({

  render: function () {
    var users = this.props.users;
    var matches = this.props.matches;

    if (!users && !matches) {
      return (
        <p>Loading..</p>
      );
    }

    var Users = users.map(user => <User user={user} />);
    var Matches = matches.map(match => {
      return (
        <tr>
          <td>{match.homename + ' - ' + match.awayname}</td>
          <td>{match.homegoals + ' - ' + match.awaygoals}</td>
        </tr>        
      )
    });

    return (
      <section>
        <h2>Dagens kamper</h2>
        <table>
          {Matches}
        </table>
        <Link to="matchday" day="7">Se hva som er tippet i dag?</Link>
        <h2>Deltagere</h2>
        <ul>
          {Users}
        </ul>
      </section>
    );
  }
});
