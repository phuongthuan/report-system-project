import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import FlashMessage from "containers/FlashMessage";
import MessageContainer from "./MessageContainer";
import NoMatch from "../../utils/NoMatch";

class MessagePage extends Component {
  render() {
    return (
      <div className="container">
        <FlashMessage />
        <Switch>
          <Route exact path="/message" component={MessageContainer}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default MessagePage;
