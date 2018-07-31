import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TeamContainer from "./TeamContainer";
import NoMatch from "../../utils/NoMatch";
import TeamDetailContainer from "./TeamDetailContainer";

class TeamPage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/team" component={TeamContainer} />
          <Route path="/team/:id" component={TeamDetailContainer} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

TeamPage.propTypes = {};

export default TeamPage;
