import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import ProfileContainer from "./ProfileContainer";
import NoMatch from "../../utils/NoMatch";

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <FlashMessage />
        <Switch>
          <Route exact path="/profile/edit" component={ProfileContainer} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default ProfilePage;
