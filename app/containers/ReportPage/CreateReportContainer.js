import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CreateReportForm from '../../components/CreateReportForm'
import SideBar from '../../components/SideBar'
import { selectUser } from "../Auth/selectors";
import { createReport } from "./actions";
import { addFlashMessage } from "../FlashMessage/actions";

class CreateReportContainer extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    createReport: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  };

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
