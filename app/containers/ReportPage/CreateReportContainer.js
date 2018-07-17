import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateReportForm from '../../components/CreateReportForm'
import SideBar from '../../components/SideBar'
import * as ReportPageActions from "./actions";
import * as FlashMessageActions from "../FlashMessage/actions";
import { selectUser } from "../Auth/selectors";

class CreateReportContainer extends Component {
  render() {
    const { createReport, addFlashMessage, user } = this.props;
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="col-md-8">
          <CreateReportForm
            {...this.props}
            user={user}
            createReport={createReport}
            addFlashMessage={addFlashMessage}
          />
        </div>
      </div>
    );
  }
}

CreateReportContainer.propTypes = {
  createReport: PropTypes.func,
  addFlashMessage: PropTypes.func,
};

export const mapStateToProps = state => ({
  user: selectUser(state)
});

export const mapDispatchToProps = dispatch => ({
  createReport: payload => dispatch(ReportPageActions.createReport(payload)),
  addFlashMessage: message => dispatch(FlashMessageActions.addFLashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReportContainer);
