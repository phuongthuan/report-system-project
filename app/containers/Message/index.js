import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import MessageContainer from "./MessageContainer";

class MessagePage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/message" component={MessageContainer}/>
        </Switch>
      </div>
    );
  }
}

export default MessagePage;
