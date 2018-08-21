import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux';
import Spinner from 'components/Spinner'
import { selectUser } from "../Auth/selectors";
import { selectError, selectReportLoading, selectReports } from "./selectors";
import {
  deleteReport,
  fetchAllReportsOfUser,
  fetchAllReportsOfUserByDay,
  fetchAllReportsOfUserByRange
} from "./actions";
import { getAllReportsOfTeam, getAllReportsOfTeamByDay, getAllReportsOfTeamByRange } from "../StatisticPage/actions";
import { selectReportsOfTeam, selectStatisticLoading } from "../StatisticPage/selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import ReportTable from '../../components/ReportTable/index'

class ReportContainer extends Component {

  static propTypes = {
    fetchAllReportsOfUser: PropTypes.func.isRequired,
    fetchAllReportsOfUserByDay: PropTypes.func.isRequired,
    fetchAllReportsOfUserByRange: PropTypes.func.isRequired,

    fetchAllReportsOfTeam: PropTypes.func.isRequired,
    fetchAllReportsOfTeamByRange: PropTypes.func.isRequired,
    fetchAllReportsOfTeamByDay: PropTypes.func.isRequired,

    deleteReport: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,

    reportLoading: PropTypes.bool,
    statisticLoading: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),

    reportsOfUser: PropTypes.arrayOf(PropTypes.object).isRequired,
    reportsOfTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }).isRequired,
  };

  state = {
    action: ''
  }

  componentDidMount() {
    const {user, fetchAllReportsOfUser, fetchAllReportsOfTeam} = this.props;
    if (user && user.role === 'team_leader') {
      fetchAllReportsOfTeam(user.division);
    }
    if (user && user.role === 'member') {
      fetchAllReportsOfUser(user.id);
    }
  }

  actionChange = (action) => {
    this.setState({action});
  }

  render() {
    const {
      reportsOfUser,
      addFlashMessage,
      fetchAllReportsOfUserByRange,
      fetchAllReportsOfUserByDay,
      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfTeamByRange,
      deleteReport,
      reportLoading,
      statisticLoading,
      reportsOfTeam,
      user,
    } = this.props;

    const loading = (user.role === 'member') ? reportLoading : statisticLoading;
    const reports = (user.role === 'member') ? reportsOfUser : reportsOfTeam;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              {loading && isEmpty(reports) ? (
                <Spinner height="650px" style={{fontSize: 32}}/>
              ) : (
                <ReportTable
                  {...this.props}
                  user={user}
                  action={this.state.action}
                  data={reports}
                  addFlashMessage={addFlashMessage}
                  fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
                  fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
                  fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
                  fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
                  deleteReport={deleteReport}
                />
              )}
            </div>
          </div>
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
  fetchAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName)),
  fetchAllReportsOfUser: userId => dispatch(fetchAllReportsOfUser(userId)),

  deleteReport: reportId => dispatch(deleteReport(reportId)),
  addFlashMessage: message => dispatch(addFlashMessage(message)),

  fetchAllReportsOfTeamByRange: (teamName, range) => dispatch(getAllReportsOfTeamByRange(teamName, range)),
  fetchAllReportsOfTeamByDay: (teamName, date) => dispatch(getAllReportsOfTeamByDay(teamName, date)),

  fetchAllReportsOfUserByDay: (userId, date) => dispatch(fetchAllReportsOfUserByDay(userId, date)),
  fetchAllReportsOfUserByRange: (userId, range) => dispatch(fetchAllReportsOfUserByRange(userId, range)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);