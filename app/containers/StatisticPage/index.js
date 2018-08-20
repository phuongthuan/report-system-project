import React, { Component, Fragment } from 'react';
import { Route,  Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import StatisticContainer from "./StatisticContainer";
import NoMatch from "../../utils/NoMatch";
import PermissionRoute from '../../utils/PermissionRoute'
import { TEAM_LEADER } from '../../constants/rolesType'

class StatisticPage extends Component {
  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default StatisticPage;
