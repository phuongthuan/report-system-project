import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import LineChart from "../../components/Chart/LineChart";
import PieChart from "../../components/Chart/PieChart";
import { getAllReportsOfTeam, getAllReportsOfTeamByRange } from "./actions";
import { selectStatisticLoading, selectReportsOfTeam } from "./selectors";
import { selectProfile } from "../ProfilePage/selectors";
import { selectUser } from "../Auth/selectors";
import Navigation from "../../components/Navigation";
import Spinner from "../../components/Spinner";

class StatisticContainer extends Component {

  componentDidMount() {
    const { getAllReportsOfTeam, user } = this.props;
    if (user.role === 'team_leader') {
      getAllReportsOfTeam(user.division);
    }
  }

  render() {
    const { reportsOfTeam, loading } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <SideBar/>
          </div>
          <div className="col-md-10">
            <div className="row mb-3">
              <div className="col-md-12">
                <Navigation />
              </div>
            </div>

            {loading && isEmpty(reportsOfTeam) ? (
              <Spinner />
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <div className="shadow-sm">
                    <PieChart dataSource={reportsOfTeam} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="shadow-sm">
                    <LineChart dataSource={reportsOfTeam} />
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
  getAllReportsOfTeam: PropTypes.func,
  getAllReportsOfTeamByRange: PropTypes.func,
}

const mapStateToProps = state => ({
  reportsOfTeam: selectReportsOfTeam(state),
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectStatisticLoading(state)
});

const mapDispatchToProps = dispatch => ({
  getAllReportsOfTeam: teamName => dispatch(getAllReportsOfTeam(teamName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticContainer);
