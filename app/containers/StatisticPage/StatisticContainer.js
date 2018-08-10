import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import { getAllReportsOfTeam, getAllReportsOfTeamByDay, getAllReportsOfTeamByRange } from "./actions";
import { selectReportsOfTeam, selectStatisticLoading } from "./selectors";
import { selectProfile } from "../ProfilePage/selectors";
import { selectUser } from "../Auth/selectors";
import Spinner from "../../components/Spinner";
import EmotionPie from "../../components/Chart/PieChart/EmotionPie";
import EmotionLine from "../../components/Chart/LineChart/EmotionLine";
import IssueLine from "../../components/Chart/LineChart/IssueLine";
import IssuePie from "../../components/Chart/PieChart/IssuePie";
import WeeklyReportModal from '../../components/WeeklyReportModal/index'
import { addFlashMessage } from "../FlashMessage/actions";
import { createWeeklyReport } from "../WeeklyReport/actions";
import DatePickerComponent from "../../components/DateTimePicker/DatePickerComponent";
import RangePickerComponent from "../../components/DateTimePicker/RangePickerComponent";
import { fetchAllReportsOfUserByDay, fetchAllReportsOfUserByRange } from "../ReportPage/actions";

class StatisticContainer extends Component {

  state = {
    action: ''
  }

  componentDidMount() {
    const {fetchAllReportsOfTeam, user, location} = this.props;
    if (user.role === 'team_leader') {
      fetchAllReportsOfTeam(user.division);
    }
    if (user.role === 'group_leader' && location) {
      if (location.state.teamName) {
        fetchAllReportsOfTeam(location.state.teamName);
      }
    }
  }

  actionChange = (action) => {
    this.setState({action});
  }

  render() {
    const {
      user,
      createWeeklyReport,
      addFlashMessage,
      reportsOfTeam,
      loading,
      fetchAllReportsOfTeamByRange,
      fetchAllReportsOfTeamByDay,
      fetchAllReportsOfUserByDay,
      fetchAllReportsOfUserByRange
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-3">
          <SideBar/>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div>
                {user.role === 'team_leader' ? (
                  <WeeklyReportModal
                    user={user}
                    addFlashMessage={addFlashMessage}
                    createWeeklyReport={createWeeklyReport}
                  />
                ) : (
                  null
                )}
              </div>
            </div>
            <div className="col-md-8">
              <div className="d-flex justify-content-between mb-3">

                <DatePickerComponent
                  {...this.props}
                  actionChange={this.actionChange}
                  user={user}
                  fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
                  fetchAllReportsOfUserByDay={fetchAllReportsOfUserByDay}
                />

                <RangePickerComponent
                  {...this.props}
                  actionChange={this.actionChange}
                  user={user}
                  fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
                  fetchAllReportsOfUserByRange={fetchAllReportsOfUserByRange}
                />

              </div>
            </div>
          </div>

          {loading && isEmpty(reportsOfTeam) ? (
            <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}}/>
          ) : (
            <Fragment>
              <div className="row">
                <div className="col-md-12">
                  <div className="shadow-sm">
                    <IssuePie
                      action={this.state.action}
                      dataSource={reportsOfTeam}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="shadow-sm">
                    <IssueLine
                      action={this.state.action}
                      dataSource={reportsOfTeam}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="shadow-sm">
                    <EmotionPie
                      action={this.state.action}
                      dataSource={reportsOfTeam}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="shadow-sm">
                    <EmotionLine
                      action={this.state.action}
                      dataSource={reportsOfTeam}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

StatisticContainer.propTypes = {
  reportsOfTeam: PropTypes.array,
  profile: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool,
  fetchAllReportsOfTeam: PropTypes.func,
  fetchAllReportsOfTeamByRange: PropTypes.func,
  fetchAllReportsOfTeamByDay: PropTypes.func,
  fetchAllReportsOfUserByDay: PropTypes.func,
  fetchAllReportsOfUserByRange: PropTypes.func,
  addFlashMessage: PropTypes.func,
  createWeeklyReport: PropTypes.func,
}

const mapStateToProps = state => ({
  reportsOfTeam: selectReportsOfTeam(state),
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectStatisticLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName)),

  fetchAllReportsOfTeamByRange: (teamName, range) => dispatch(getAllReportsOfTeamByRange(teamName, range)),
  fetchAllReportsOfTeamByDay: (teamName, date) => dispatch(getAllReportsOfTeamByDay(teamName, date)),

  fetchAllReportsOfUserByDay: (userId, date) => dispatch(fetchAllReportsOfUserByDay(userId, date)),
  fetchAllReportsOfUserByRange: (userId, range) => dispatch(fetchAllReportsOfUserByRange(userId, range)),

  addFlashMessage: message => dispatch(addFlashMessage(message)),
  createWeeklyReport: payload => dispatch(createWeeklyReport(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticContainer);
