import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from 'containers/Home'
import Auth from "containers/Auth";
import styled from 'styled-components'
import ReportPage from 'containers/ReportPage';
import NoMatch from "../../utils/NoMatch";
import PrivateRoute from '../../utils/PrivateRoute'
import StatisticPage from "../StatisticPage";
import ProfilePage from "../ProfilePage";
import MemberPage from "../MemberPage";
import MessagePage from "../Message";
import img from '../../assests/images/neil-rosenstech-752022-unsplash.jpg'

const AppWrapper = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 50px 0;
`;

export default class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Auth}/>
          <PrivateRoute path="/message" component={MessagePage}/>
          <PrivateRoute path="/report" component={ReportPage} />
          <PrivateRoute path="/statistic" component={StatisticPage} />
          <PrivateRoute path="/profile" component={ProfilePage}/>
          <PrivateRoute path="/member" component={MemberPage}/>
          <Route component={NoMatch}/>
        </Switch>
      </AppWrapper>
    )
  }
}
