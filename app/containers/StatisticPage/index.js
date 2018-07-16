import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom'
import StatisticContainer from "./StatisticContainer";
import MembersList from "../../components/MembersList";
import TeamsList from "../../components/TeamsList";

class StatisticPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/statistic" component={StatisticContainer} />
        <Route path="/statistic/members" component={MembersList} />
        <Route path="/statistic/teams" component={TeamsList} />
      </Switch>
    );
  }
}

export default StatisticPage;
