import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom'
import MemberContainer from "./MemberContainer";

class MemberPage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/members" component={MemberContainer} />
        </Switch>
      </div>
    );
  }
}

export default MemberPage;
