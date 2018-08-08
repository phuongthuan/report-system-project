import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import MessageContainer from "./MessageContainer";
import NoMatch from "../../utils/NoMatch";
import PermissionRoute from '../../utils/PermissionRoute'
import { TEAM_LEADER, MEMBER } from "../../constants/rolesType";

class MessagePage extends Component {
  render() {
    return (
      <div className="container">
        <FlashMessage />
        <Switch>
          <PermissionRoute
            exact
            path="/message"
            role={[TEAM_LEADER, MEMBER]}
            component={MessageContainer}
          />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default MessagePage;
