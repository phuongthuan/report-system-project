import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux';
import Spinner from 'components/Spinner'
import ReportsList from '../../components/ReportsList'
import SideBar from '../../components/SideBar'
import { selectUser } from "../Auth/selectors";
import { selectError, selectLoading, selectReports } from "./selectors";
import { fetchAllReportsOfUser, deleteReport } from "./actions";

class ReportContainer extends PureComponent {

  static propTypes = {
    fetchAllReportsOfUser: PropTypes.func,
    deleteReport: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    reports: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
  };

  componentDidMount() {
    const {fetchAllReportsOfUser, user} = this.props;
    fetchAllReportsOfUser(user.id);
  }

  render() {
    const {reports, deleteReport, loading} = this.props;
    return (
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <SideBar/>
        </div>
        <div className="col-md-8">
          {loading && isEmpty(reports) ? (
            <Spinner />
          ) : (
            <ReportsList
              deleteReport={deleteReport}
              reportsList={reports}
            />
          )}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  reports: selectReports(state),
  loading: selectLoading(state),
  error: selectError(state),
  user: selectUser(state)
});

export const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfUser: userId => dispatch(fetchAllReportsOfUser(userId)),
  deleteReport: reportId => dispatch(deleteReport(reportId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);