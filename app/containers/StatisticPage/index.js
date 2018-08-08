import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import StatisticContainer from "./StatisticContainer";
import NoMatch from "../../utils/NoMatch";
import PermissionRoute from '../../utils/PermissionRoute'
import { TEAM_LEADER } from '../../constants/rolesType'

class StatisticPage extends Component {
  render() {
    return (
      <div className="container">
        <FlashMessage/>
        <Switch>
          <PermissionRoute
            exact
            path="/statistic"
            role={TEAM_LEADER}
            component={StatisticContainer}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default StatisticPage;
