import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Learning from 'containers/Learning'
import Home from 'containers/Home'
import Auth from "containers/Auth";
import ReportPage from 'containers/ReportPage';
import NoMatch from "../../utils/NoMatch";
import PrivateRoute from '../../utils/PrivateRoute'
import StatisticPage from "../StatisticPage";
import ProfilePage from "../ProfilePage";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Auth}/>
        <PrivateRoute path="/learning" component={Learning}/>
        <PrivateRoute path="/report" component={ReportPage} />
        <PrivateRoute path="/statistic" component={StatisticPage} />
        <PrivateRoute path="/profile" component={ProfilePage}/>
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}
