import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import ProfileForm from "../../components/ProfileForm";
import ProfileContainer from "./ProfileContainer";

class ReportPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/profile" component={ProfileContainer} />
        <Route path="/profile/update/:id" component={ProfileForm} />
      </Switch>
    );
  }
}

export default ReportPage;
