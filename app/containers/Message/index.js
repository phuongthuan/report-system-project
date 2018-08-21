import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import MessageContainer from "./MessageContainer";
import NoMatch from "../../utils/NoMatch";
import PermissionRoute from '../../utils/PermissionRoute'
import { TEAM_LEADER, MEMBER } from "../../constants/rolesType";

class MessagePage extends Component {
  render() {
    const role = [TEAM_LEADER, MEMBER]
    return (
      <Fragment>
        <FlashMessage />
        <Switch>
          <PermissionRoute
            exact
            path="/message"
            role={role}
            component={MessageContainer}
          />
          <Route component={NoMatch}/>
        </Switch>
      </Fragment>
    );
  }
}

export default MessagePage;
