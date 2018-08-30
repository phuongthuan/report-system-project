import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import ProfileContainer from "./ProfileContainer";
import NoMatch from "../../utils/NoMatch";

const ProfilePage = () => (
  <Fragment>
    <FlashMessage/>
    <Switch>
      <Route exact path="/profile/edit" component={ProfileContainer}/>
      <Route component={NoMatch}/>
    </Switch>
  </Fragment>
);

export default ProfilePage;
