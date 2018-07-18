import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import ProfileContainer from "./ProfileContainer";

class ProfilePage extends Component {
  render() {
    return (
      <div className="container">
        <FlashMessage />
        <Switch>
          <Route exact path="/profile/edit" component={ProfileContainer} />
        </Switch>
      </div>
    );
  }
}

export default ProfilePage;
