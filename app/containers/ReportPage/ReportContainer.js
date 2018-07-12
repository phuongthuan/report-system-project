import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReportsList from '../../components/ReportsList'
import SideBar from '../../components/SideBar'

import * as ReportPageActions from './actions';
import { selectError, selectLoading, selectReports } from "./selectors";

class ReportContainer extends PureComponent {

  componentDidMount() {
    const {fetchReports: getReports} = this.props;
    getReports();
  }

  render() {
    const {reports, deleteReport, updateReport } = this.props;
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="col-md-8">
          <div className="row">
            <ReportsList
              updateAction={updateReport}
              deleteAction={deleteReport}
              reportsList={reports}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReportContainer.propTypes = {
  fetchReports: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  reports: PropTypes.arrayOf(PropTypes.object)
};

export const mapStateToProps = state => ({
  reports: selectReports(state),
  loading: selectLoading(state),
  error: selectError(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchReports: () => dispatch(ReportPageActions.fetchReports()),
  createReport: (report) => dispatch(ReportPageActions.createReport(report)),
  updateReport: (report) => dispatch(ReportPageActions.updateReport(report)),
  deleteReport: (reportId) => dispatch(ReportPageActions.deleteReport(reportId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);
