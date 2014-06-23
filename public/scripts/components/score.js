var React = require('react');
var _     = require('lodash');

var api = require('../api');

module.exports = React.createClass({

  componentDidMount: function () {
    var match = this.match();

    this.setState({ homegoals: match.homegoals, awaygoals: match.awaygoals });

    if (api.isOngoing(match)) {
      this.scheduleFetchLiveResults(2000);
    }
  },

  render: function () {
    var align = this.props.align;

    var style = {};
    if (align) {
      style["float"] = align;
    }

    if (!this.state) {
      return (<div></div>);
    }

    return (
      <span style={style}>
        <span className="score-home">{this.state.homegoals}</span>
        <span className="score-separator"> - </span>
        <span className="score-away">{this.state.awaygoals}</span>
      </span>
    );
  },

  match: function () {
    return this.props.match;
  },

  scheduleFetchLiveResults: function (everyMs) {
    var self = this,
        match = this.match();
    (function fetchLiveResults () {
      api.fetchLiveResult(match)
        .then(results => self.setState({ homegoals: results.homegoals, awaygoals: results.awaygoals }))
        .catch(Promise.reject)
        .finally(() => setTimeout(fetchLiveResults, everyMs));
    })();
  }
});
