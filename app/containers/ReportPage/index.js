import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ReportContainer from "./ReportContainer";
import CreateReportContainer from "./CreateReportContainer";
import UpdateReportContainer from "./UpdateReportContainer";
import FlashMessageList from "../../components/FlashMessageList/index";
import FlashMessage from "../../components/FlashMessageList/FlashMessage";

class ReportPage extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="container">
        <FlashMessageList />
        {/*<FlashMessage />*/}
        <Switch location={location}>
          <Route exact path="/report" component={ReportContainer}/>
          <Route path="/report/create" component={CreateReportContainer}/>
          <Route path="/report/update/:id" component={UpdateReportContainer}/>
        </Switch>
      </div>
    );
  }
}

export default ReportPage;
