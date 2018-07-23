import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux';
import Spinner from 'components/Spinner'
import ReportsList from '../../components/ReportsList'
import SideBar from '../../components/SideBar'
import { selectUser } from "../Auth/selectors";
import { selectError, selectReportLoading, selectReports } from "./selectors";
import { fetchAllReportsOfUser, deleteReport } from "./actions";
import { getAllReportsOfTeam } from "../StatisticPage/actions";
import { selectReportsOfTeam, selectStatisticLoading } from "../StatisticPage/selectors";

class ReportContainer extends PureComponent {

  static propTypes = {
    fetchAllReportsOfUser: PropTypes.func,
    deleteReport: PropTypes.func,
    reportLoading: PropTypes.bool,
    statisticLoading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    reportsOfUser: PropTypes.arrayOf(PropTypes.object),
    reportsOfTeam: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
  };

  componentDidMount() {
    const { user, fetchAllReportsOfUser, getAllReportsOfTeam } = this.props;
    if (user && user.role === 'team_leader') {
      getAllReportsOfTeam(user.division);
    }
    fetchAllReportsOfUser(user.id);
  }

  render() {

    const {reportsOfUser, deleteReport, reportLoading, statisticLoading, reportsOfTeam, user} = this.props;
    const loading = (user.role === 'member') ? reportLoading : statisticLoading;
    const reports = (user.role === 'member') ? reportsOfUser : reportsOfTeam;

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
              user={user}
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
  reportsOfUser: selectReports(state),
  reportsOfTeam: selectReportsOfTeam(state),
  reportLoading: selectReportLoading(state),
  statisticLoading: selectStatisticLoading(state),
  error: selectError(state),
  user: selectUser(state)
});

export const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfUser: userId => dispatch(fetchAllReportsOfUser(userId)),
  deleteReport: reportId => dispatch(deleteReport(reportId)),
  getAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);