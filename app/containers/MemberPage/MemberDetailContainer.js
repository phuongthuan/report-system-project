import React, { Component } from 'react';
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import MemberDetail from "../../components/MemberDetail";
import { selectError, selectReportLoading, selectReports } from "../ReportPage/selectors";
import { fetchAllReportsOfUser, fetchAllReportsOfUserByDay, fetchAllReportsOfUserByRange } from "../ReportPage/actions";
import { selectMember, selectMemberLoading } from "./selectors";
import { getMemberProfile } from "./actions";
import { selectUser } from "../Auth/selectors";
import { deleteWeeklyReport, fetchAllWeeklyReportsOfUser } from "../WeeklyReport/actions";
import { selectWeeklyReports } from "../WeeklyReport/selectors";
import { addFlashMessage } from "../FlashMessage/actions";
import { getAllReportsOfTeamByDay, getAllReportsOfTeamByRange } from "../StatisticPage/actions";

class MemberDetailContainer extends Component {

  state = {
    action: ''
  }

  componentDidMount() {
    const {
      match,
      fetchAllReportsOfUser,
      getMemberProfile,
      fetchAllWeeklyReportsOfUser
    } = this.props;

    const memberId = match.params.id;

    fetchAllReportsOfUser(memberId);
    getMemberProfile(memberId);
    fetchAllWeeklyReportsOfUser(memberId)
  }

  actionChange = (action) => {
    this.setState({action});
  }

  render() {
    const {
      reports,
      weekly_reports,
      loading,
      memberLoading,
      member,
      user,
      removeWeeklyReport,
      fetchAllReportsOfUserByRange,
      fetchAllReportsOfUserByDay,
      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfTeamByRange,
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          {loading && isEmpty(reports) ? (
            <Spinner height="650px" style={{fontSize: 32}} />
          ) : (
            <MemberDetail
              {...this.props}
              action={this.state.action}
              actionChange={this.actionChange}
              user={user}
              member={member}

              loading={loading}
              memberLoading={memberLoading}

              reportsList={reports}
              weeklysReportList={weekly_reports}

              removeWeeklyReport={removeWeeklyReport}

              fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
              fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
              fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
              fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
            />
          )}
        </div>
      </div>
    );
  }
}

MemberDetailContainer.propTypes = {
  reports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  memberLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  member: PropTypes.object.isRequired,
  fetchAllReportsOfUser: PropTypes.func.isRequired,
  fetchAllWeeklyReportsOfUser: PropTypes.func.isRequired,
  getMemberProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  reports: selectReports(state),
  loading: selectReportLoading(state),
  error: selectError(state),
  user: selectUser(state),
  member: selectMember(state),
  memberLoading: selectMemberLoading(state),
  weekly_reports: selectWeeklyReports(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfUser: userId => dispatch(fetchAllReportsOfUser(userId)),
  fetchAllWeeklyReportsOfUser: userId => dispatch(fetchAllWeeklyReportsOfUser(userId)),

  getMemberProfile: id => dispatch(getMemberProfile(id)),
  addFlashMessage: message => dispatch(addFlashMessage(message)),
  removeWeeklyReport: id => dispatch(deleteWeeklyReport(id)),

  fetchAllReportsOfTeamByRange: (teamName, range) => dispatch(getAllReportsOfTeamByRange(teamName, range)),
  fetchAllReportsOfTeamByDay: (teamName, date) => dispatch(getAllReportsOfTeamByDay(teamName, date)),

  fetchAllReportsOfUserByDay: (userId, date) => dispatch(fetchAllReportsOfUserByDay(userId, date)),
  fetchAllReportsOfUserByRange: (userId, range) => dispatch(fetchAllReportsOfUserByRange(userId, range)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetailContainer);
