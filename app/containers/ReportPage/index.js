import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import ReportContainer from "./ReportContainer";
import ReportForm from "../../components/ReportForm";

class ReportPage extends Component {
  render() {

    return (
      <Switch>
        <Route exact path="/report" component={ReportContainer} />
        <Route path="/report/create" component={ReportForm} />
      </Switch>
    );
  }
}

export default ReportPage;
