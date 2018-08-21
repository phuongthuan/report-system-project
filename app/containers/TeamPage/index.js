import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import TeamContainer from "./TeamContainer";
import NoMatch from "../../utils/NoMatch";
import TeamDetailContainer from "./TeamDetailContainer";
import StatisticContainer from "../StatisticPage/StatisticContainer";
import PermissionRoute from '../../utils/PermissionRoute'
import { GROUP_LEADER } from '../../constants/rolesType'
import WeeklyReportContainer from "../WeeklyReport/WeeklyReportContainer";

const TeamPage = () => (
  <Fragment>
    <Switch>
      <PermissionRoute
        exact
        path="/team"
        role={GROUP_LEADER}
        component={TeamContainer}
      />
      <PermissionRoute
        role={GROUP_LEADER}
        path="/team/:id/statistic"
        component={StatisticContainer}
      />
      <PermissionRoute
        role={GROUP_LEADER}
        path="/team/:id/weekly-report"
        component={WeeklyReportContainer}
      />
      <PermissionRoute
        role={GROUP_LEADER}
        path="/team/:id"
        component={TeamDetailContainer}
      />
      <Route component={NoMatch}/>
    </Switch>
  </Fragment>
);

export default TeamPage;
