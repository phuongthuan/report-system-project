import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types";
import SideBar from '../../components/SideBar'
import * as ReportPageActions from './actions'
import UpdateReportForm from "../../components/UpdateReportForm";
import { selectAReport, selectError, selectLoading } from "./selectors";

class UpdateReportContainer extends Component {

  componentDidMount() {
    const {fetchAReport, match} = this.props;
    const reportId = match.params.id;
    fetchAReport(reportId);
  }

  render() {
    const {updateReport, report, loading} = this.props;
    console.log('UpdateReportContainer', report);
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar/>
        </div>
        <div className="col-md-8">
          {loading && isEmpty(report) ? (
            <FontAwesomeIcon icon="spinner" size="lg" spin/>
          ) : (
            <UpdateReportForm
              {...this.props}
              report={report}
              updateReport={updateReport}
            />
          )}
        </div>
      </div>
    );
  }
}

UpdateReportContainer.propTypes = {
  fetchAReport: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  report: PropTypes.object
};

const mapStateToProps = state => ({
  report: selectAReport(state),
  loading: selectLoading(state),
  error: selectError(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAReport: id => dispatch(ReportPageActions.fetchAReport(id)),
  updateReport: payload => dispatch(ReportPageActions.updateReport(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateReportContainer);
