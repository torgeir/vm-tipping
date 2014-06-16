var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({

  render: function () {
    var match = this.match();
    
    return (
      <li className='bet'>
        <span>{match.homename + ' - ' + match.awayname}</span> 
        <span>{match.homegoals + ' - ' + match.awaygoals}</span>
      </li>
    );
  },

  match: function () {
    return this.props.match;
  }
});
