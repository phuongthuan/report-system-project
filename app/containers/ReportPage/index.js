import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import ReportContainer from "./ReportContainer";
import CreateReportContainer from "./CreateReportContainer";
import UpdateReportContainer from "./UpdateReportContainer";
import NoMatch from "../../utils/NoMatch";

class ReportPage extends Component {
  render() {
    return (
      <div className="container">
        <FlashMessage />
        <Switch>
          <Route exact path="/report" component={ReportContainer}/>
          <Route path="/report/create" component={CreateReportContainer}/>
          <Route path="/report/update/:id" component={UpdateReportContainer}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default ReportPage;
