import React, { Component } from 'react';
import ReportForm from '../../components/ReportForm'
import SideBar from '../../components/SideBar'

class UpdateReportContainer extends Component {
  render() {
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="col-md-8">
          <ReportForm />
        </div>
      </div>
    );
  }
}

export default UpdateReportContainer;
