import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from 'containers/FlashMessage'
import NoMatch from "../../utils/NoMatch";
import WeeklyReportContainer from "./WeeklyReportContainer";

const WeeklyReport = () => (
  <Fragment>
    <FlashMessage/>
    <Switch>
      <Route exact path="/weekly-report" component={WeeklyReportContainer}/>
      <Route component={NoMatch}/>
    </Switch>
  </Fragment>
);

export default WeeklyReport;
