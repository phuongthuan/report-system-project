import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom'
import MemberContainer from "./MemberContainer";
import MemberDetailContainer from "./MemberDetailContainer";
import NoMatch from "../../utils/NoMatch";

class MemberPage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/member" component={MemberContainer} />
          <Route path="/member/:id" component={MemberDetailContainer} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default MemberPage;
