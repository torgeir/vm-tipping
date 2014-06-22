var _     = require('lodash');
var React = require('react');
var Link  = require('rrouter').Link;

var User  = require('./user');
var Match = require('./match');
var Score = require('./score');
var Vs    = require('./vs');
var Time  = require('./time');
var Flag  = require('./flag');

var api     = require('../api');
var Funfact = require('../funfacts');

module.exports = React.createClass({

  render: function () {
    var matchDay = api.getMatchDay();
    var users = this.props.users;
    var matches = this.props.matches;

    if (!users && !matches) {
      return (
        <p>Loading..</p>
      );
    }

    var randomTeam = _(Funfact).chain().keys().sample().value();
    
    var Users = users.map(user => <User user={user} />);
    var Matches = matches.map(match => {

      var className = "";
      if (api.isOngoing(match)) {
        className = 'ongoing';
      }
      else if (api.hasPassed(match)) {
        className = 'complete';
      }

      return (
        <tr className={className}>
          <td><Time match={match} /> <Vs home={match.homename} away={match.awayname} /></td>
          <td><Score match={match} /></td>
        </tr>
      )
    });

    return (
      <section>
        <h2>Dagens kamper</h2>
        <table>
          {Matches}
        </table>
        <Link to="matchday" day={matchDay}>Se hva som er tippet i dag?</Link>
        <h2>Deltagere</h2>
        <ul>
          {Users}
        </ul>
        <h2>Pondus Funfacts</h2>
        <p><Flag team={randomTeam} /> {Funfact[randomTeam]}</p>
      </section>
    );
  }

});
