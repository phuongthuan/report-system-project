import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import ReportContainer from "./ReportContainer";
import CreateReportContainer from "./CreateReportContainer";
import UpdateReportContainer from "./UpdateReportContainer";
import NoMatch from "../../utils/NoMatch";
import ReportDetailContainer from "./ReportDetailContainer";
import { GROUP_LEADER, MEMBER, TEAM_LEADER } from "../../constants/rolesType";
import PermissionRoute from '../../utils/PermissionRoute'

class ReportPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <FlashMessage/>
        <Switch>
          <PermissionRoute
            exact
            path="/report"
            role={[TEAM_LEADER, MEMBER]}
            component={ReportContainer}
          />
          <PermissionRoute role={MEMBER} path="/report/create" component={CreateReportContainer}/>
          <PermissionRoute role={MEMBER} path="/report/update/:id" component={UpdateReportContainer}/>
          <PermissionRoute
            role={[MEMBER, TEAM_LEADER, GROUP_LEADER]}
            path="/report/:id"
            component={ReportDetailContainer}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default ReportPage;
