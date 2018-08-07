import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TeamContainer from "./TeamContainer";
import NoMatch from "../../utils/NoMatch";
import TeamDetailContainer from "./TeamDetailContainer";
import StatisticContainer from "../StatisticPage/StatisticContainer";
import TestContainer from "../TestContainer";

class TeamPage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/team" component={TeamContainer} />
          <Route path="/team/:id/statistic" component={StatisticContainer}/>
          <Route path="/team/:id/weekly-report" component={TestContainer}/>
          <Route path="/team/:id" component={TeamDetailContainer} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

TeamPage.propTypes = {};

export default TeamPage;
