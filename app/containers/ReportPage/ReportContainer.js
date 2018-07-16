import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReportsList from '../../components/ReportsList'
import SideBar from '../../components/SideBar'

import * as ReportPageActions from './actions';
import { selectError, selectLoading, selectReports } from "./selectors";
import { selectUser } from "../Auth/selectors";

class ReportContainer extends PureComponent {

  componentDidMount() {
    const {fetchAllReportsOfUser: getReports, user} = this.props;
    getReports(user.id);
  }

  render() {
    const {reports, deleteReport, updateReport, loading } = this.props;
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="col-md-8">
          <div className="row">
            {loading ? (
              <FontAwesomeIcon icon="spinner" size="lg" spin />
            ) : (
              <ReportsList
                updateAction={updateReport}
                deleteAction={deleteReport}
                reportsList={reports}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

ReportContainer.propTypes = {
  fetchAllReportsOfUser: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  reports: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

export const mapStateToProps = state => ({
  reports: selectReports(state),
  loading: selectLoading(state),
  error: selectError(state),
  user: selectUser(state)
});

export const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfUser: (userId) => dispatch(ReportPageActions.fetchAllReportsOfUser(userId)),
  createReport: (report) => dispatch(ReportPageActions.createReport(report)),
  updateReport: (report) => dispatch(ReportPageActions.updateReport(report)),
  deleteReport: (reportId) => dispatch(ReportPageActions.deleteReport(reportId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);