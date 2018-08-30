import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import MemberContainer from "./MemberContainer";
import MemberDetailContainer from "./MemberDetailContainer";
import NoMatch from "../../utils/NoMatch";
import PermissionRoute from '../../utils/PermissionRoute'
import { TEAM_LEADER, GROUP_LEADER } from "../../constants/rolesType";

const role = [TEAM_LEADER, GROUP_LEADER];

const MemberPage = () => (
  <Fragment>
    <FlashMessage/>
    <Switch>
      <PermissionRoute
        exact
        path="/member"
        role={role}
        component={MemberContainer}
      />
      <PermissionRoute
        role={role}
        path="/member/:id"
        component={MemberDetailContainer}
      />
      <Route component={NoMatch}/>
    </Switch>
  </Fragment>
)

export default MemberPage;
