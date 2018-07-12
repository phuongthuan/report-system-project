import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import ReportContainer from "./ReportContainer";
import ReportForm from "../../components/ReportForm";
import CreateReportContainer from "./CreateReportContainer";

class ReportPage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/report" component={ReportContainer} />
          <Route path="/report/create" component={CreateReportContainer} />
          <Route path="/report/update/:id" component={ReportForm} />
        </Switch>
      </div>
    );
  }
}

export default ReportPage;
