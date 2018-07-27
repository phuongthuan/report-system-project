import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom'
import StatisticContainer from "./StatisticContainer";

class StatisticPage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/statistic" component={StatisticContainer} />
        </Switch>
      </div>
    );
  }
}

export default StatisticPage;
