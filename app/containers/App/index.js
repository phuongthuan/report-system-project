import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Learning from 'containers/Learning'
import Home from 'containers/Home'
import ReportPage from 'containers/ReportPage';
import Auth from "containers/Auth";
import ProfileContainer from "../ProfilePage/ProfileContainer";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/learning" component={Learning}/>
        <Route path="/report" component={ReportPage}/>
        <Route path="/login" component={Auth}/>
        <Route path="/profile" component={ProfileContainer}/>
      </Switch>
    )
  }
}
