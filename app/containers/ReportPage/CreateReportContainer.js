import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CreateReportForm from '../../components/CreateReportForm'
import SideBar from '../../components/SideBar'
import { selectUser } from "../Auth/selectors";
import { createReport } from "./actions";
import { addFlashMessage } from "../FlashMessage/actions";
import ReportForm from '../../components/ReportForm/index'

class CreateReportContainer extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    createReport: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  };

  render() {
    const { createReport, addFlashMessage, user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">

            <CreateReportForm
              {...this.props}
              user={user}
              createReport={createReport}
              addFlashMessage={addFlashMessage}
            />

            {/*<ReportForm*/}
              {/*user={user}*/}
              {/*createReport={createReport}*/}
              {/*addFlashMessage={addFlashMessage}*/}
            {/*/>*/}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: selectUser(state)
});

export const mapDispatchToProps = dispatch => ({
  createReport: payload => dispatch(createReport(payload)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReportContainer);
