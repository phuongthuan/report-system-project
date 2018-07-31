import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'

import { getAllReportsOfTeam, getAllReportsOfTeamByDay, getAllReportsOfTeamByRange } from "./actions";
import { selectStatisticLoading, selectReportsOfTeam } from "./selectors";
import { selectProfile } from "../ProfilePage/selectors";
import { selectUser } from "../Auth/selectors";
import FilterReport from '../../components/FilterReport/index'
import Spinner from "../../components/Spinner";
import EmotionPie from "../../components/Chart/PieChart/EmotionPie";
import EmotionLine from "../../components/Chart/LineChart/EmotionLine";
import IssueLine from "../../components/Chart/LineChart/IssueLine";
import IssuePie from "../../components/Chart/PieChart/IssuePie";

class StatisticContainer extends Component {

  componentDidMount() {
    const {fetchAllReportsOfTeam, user} = this.props;
    if (user.role === 'team_leader') {
      fetchAllReportsOfTeam(user.division);
    }
  }

  render() {
    const {user, reportsOfTeam, loading, fetchAllReportsOfTeamByRange, fetchAllReportsOfTeamByDay} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <SideBar/>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <FilterReport
                  user={user}
                  fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
                  fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
                />
              </div>
            </div>

            {loading && isEmpty(reportsOfTeam) ? (
              <Spinner height="650px" style={{fontSize: 32, color: '#FFFFFF'}}/>
            ) : (
              <Fragment>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="shadow-sm">
                      <IssuePie dataSource={reportsOfTeam}/>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="shadow-sm">
                      <IssueLine dataSource={reportsOfTeam}/>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="shadow-sm">
                      <EmotionPie dataSource={reportsOfTeam}/>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="shadow-sm">
                      <EmotionLine dataSource={reportsOfTeam}/>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
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
  fetchAllReportsOfTeamByDay: (teamName, date) => dispatch(getAllReportsOfTeamByDay(teamName, date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticContainer);
