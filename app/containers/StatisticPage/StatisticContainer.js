import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import LineChart from "../../components/Chart/LineChart";
import PieChart from "../../components/Chart/PieChart";
import { getAllReportsOfTeam, getAllReportsOfTeamByDay, getAllReportsOfTeamByRange } from "./actions";
import { selectStatisticLoading, selectReportsOfTeam } from "./selectors";
import { selectProfile } from "../ProfilePage/selectors";
import { selectUser } from "../Auth/selectors";
import FilterReport from '../../components/FilterReport/index'
import Spinner from "../../components/Spinner";

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
          <div className="col-md-3">
            <SideBar/>
          </div>
          <div className="col-md-9">
            <div className="row mb-3">
              <div className="col-md-6">
                {/*<Navigation />*/}
                <FilterReport
                  user={user}
                  fetchAllReportsOfTeamByRange={fetchAllReportsOfTeamByRange}
                  fetchAllReportsOfTeamByDay={fetchAllReportsOfTeamByDay}
                />
              </div>
            </div>

            {loading && isEmpty(reportsOfTeam) ? (
              <Spinner/>
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <div className="shadow-sm">
                    <PieChart dataSource={reportsOfTeam}/>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="shadow-sm">
                    <LineChart dataSource={reportsOfTeam}/>
                  </div>
                </div>
              </div>
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
