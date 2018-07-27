import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import Spinner from 'components/Spinner'
import PropTypes from "prop-types";

import SideBar from '../../components/SideBar'
import UpdateReportForm from "../../components/UpdateReportForm";
import { selectAReport, selectError, selectReportLoading } from "./selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import { fetchAReport, updateReport } from "./actions";

class UpdateReportContainer extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    report: PropTypes.object.isRequired,
    fetchAReport: PropTypes.func.isRequired,
    updateReport: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {fetchAReport, match} = this.props;
    const reportId = match.params.id;
    fetchAReport(reportId);
  }

  render() {
    const {updateReport, report, loading, addFlashMessage} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            {loading && isEmpty(report) ? (
              <Spinner />
            ) : (
              <UpdateReportForm
                {...this.props}
                report={report}
                updateReport={updateReport}
                addFlashMessage={addFlashMessage}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  report: selectAReport(state),
  loading: selectReportLoading(state),
  error: selectError(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAReport: id => dispatch(fetchAReport(id)),
  updateReport: payload => dispatch(updateReport(payload)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateReportContainer);
