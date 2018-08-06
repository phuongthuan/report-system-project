import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux';
import Spinner from 'components/Spinner'
import ReportsList from '../../components/ReportsList'
import SideBar from '../../components/SideBar'
import { selectUser } from "../Auth/selectors";
import { selectError, selectReportLoading, selectReports } from "./selectors";
import {
  fetchAllReportsOfUser, deleteReport, fetchAllReportsOfUserByDay,
  fetchAllReportsOfUserByRange
} from "./actions";
import { getAllReportsOfTeam, getAllReportsOfTeamByDay, getAllReportsOfTeamByRange } from "../StatisticPage/actions";
import { selectReportsOfTeam, selectStatisticLoading } from "../StatisticPage/selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import FilterReport from "../../components/FilterReport";
import DataTables from '../../components/DataTables/index'

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
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {user, fetchAllReportsOfUser, fetchAllReportsOfTeam} = this.props;
    if (user && user.role === 'team_leader') {
      fetchAllReportsOfTeam(user.division);
    }
    if (user && user.role === 'member') {
      fetchAllReportsOfUser(user.id);
    }
  }

  render() {
    const {reportsOfUser, fetchAllReportsOfUserByRange, fetchAllReportsOfUserByDay, fetchAllReportsOfTeamByDay, deleteReport, reportLoading, statisticLoading, reportsOfTeam, user, fetchAllReportsOfTeamByRange} = this.props;
    const loading = (user.role === 'member') ? reportLoading : statisticLoading;
    const reports = (user.role === 'member') ? reportsOfUser : reportsOfTeam;
    return (
      <div className="row">
        <div className="col-md-3">
          <SideBar/>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-8">
              <FilterReport
                user={user}

                fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
                fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}

                fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
                fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {loading && isEmpty(reports) ? (
                <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}} />
              ) : (
                <Fragment>
                  {reports.length === 0 ? (
                    <p className="d-flex justify-content-center display-4">No report</p>
                  ) : (
                    <Fragment>
                      {user && user.role === 'member' ? (
                        <ReportsList
                          user={user}
                          addFlashMessage={addFlashMessage}
                          deleteReport={deleteReport}
                          reportsList={reports}
                        />
                      ) : (
                        <DataTables
                          user={user}
                          reportsList={reports}
                        />
                      )}
                    </Fragment>
                  )}
                </Fragment>
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
  fetchAllReportsOfUser: userId => dispatch(fetchAllReportsOfUser(userId)),
  fetchAllReportsOfUserByDay: (userId, date) => dispatch(fetchAllReportsOfUserByDay(userId, date)),
  fetchAllReportsOfUserByRange: (userId, range) => dispatch(fetchAllReportsOfUserByRange(userId, range)),

  deleteReport: reportId => dispatch(deleteReport(reportId)),
  addFlashMessage: message => dispatch(addFlashMessage(message)),

  fetchAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName)),
  fetchAllReportsOfTeamByRange: (teamName, range) => dispatch(getAllReportsOfTeamByRange(teamName, range)),
  fetchAllReportsOfTeamByDay: (teamName, date) => dispatch(getAllReportsOfTeamByDay(teamName, date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer);