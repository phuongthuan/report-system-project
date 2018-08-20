import React, { Component, Fragment } from 'react';
import { Route,  Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import MemberContainer from "./MemberContainer";
import MemberDetailContainer from "./MemberDetailContainer";
import NoMatch from "../../utils/NoMatch";
import PermissionRoute from '../../utils/PermissionRoute'
import { TEAM_LEADER, GROUP_LEADER } from "../../constants/rolesType";

class MemberPage extends Component {
  render() {
    return (
      <Fragment>
        <FlashMessage />
        <Switch>
          <PermissionRoute
            exact
            path="/member"
            role={[TEAM_LEADER, GROUP_LEADER]}
            component={MemberContainer}
          />
          <PermissionRoute
            role={[TEAM_LEADER, GROUP_LEADER]}
            path="/member/:id"
            component={MemberDetailContainer}
          />
          <Route component={NoMatch}/>
        </Switch>
      </Fragment>
    );
  }
}

export default MemberPage;
