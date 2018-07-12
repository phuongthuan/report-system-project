import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ProfileContainer from "./ProfileContainer";

class ReportPage extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/profile" component={ProfileContainer} />
      </Switch>
    );
  }
}

export default ReportPage;
