import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from 'components/SideBar'
import isEmpty from "lodash/isEmpty";
import { addFlashMessage } from "../FlashMessage/actions";

class ReportDetailContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <SideBar/>
        </div>
        <div className="col-md-8">
          Main Content
        </div>
      </div>
    );
  }
}

ReportDetailContainer.propTypes = {};

export default ReportDetailContainer;
