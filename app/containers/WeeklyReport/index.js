import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from 'containers/FlashMessage'
import NoMatch from "../../utils/NoMatch";
import WeeklyReportContainer from "./WeeklyReportContainer";
import WeeklyReportForm from "../../components/WeeklyReportForm";
import WeeklyReportFormContainer from "./WeeklyReportFormContainer";

class WeeklyReport extends Component {
  render() {
    return (
      <div className="container">
        <FlashMessage/>
        <Switch>
          <Route exact path="/weekly-report" component={WeeklyReportContainer}/>
          <Route path="/weekly-report/create" component={WeeklyReportFormContainer}/>
          <Route path="/weekly-report/update/:id" component={WeeklyReportForm}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

WeeklyReport.propTypes = {};

export default WeeklyReport;
