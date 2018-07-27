import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom'
import StatisticContainer from "./StatisticContainer";
import NoMatch from "../../utils/NoMatch";

class StatisticPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Switch>
          <Route exact path="/statistic" component={StatisticContainer} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default StatisticPage;
