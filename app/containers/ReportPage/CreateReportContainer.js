import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectUser } from "../Auth/selectors";
import { createReport } from "./actions";
import { addFlashMessage } from "../FlashMessage/actions";
import ReportForm from '../../components/ReportForm/index'

class CreateReportContainer extends PureComponent {

  static propTypes = {
    user: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }).isRequired,

    createReport: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  };

  render() {
    const {createReport, addFlashMessage, user} = this.props;
    return (
      <div className="row mb-3">
        <div className="col-md-12 p-0">
          <ReportForm
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
