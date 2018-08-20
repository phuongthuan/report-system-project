import React, { Component } from 'react';
import SideBar from 'components/SideBar'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types';
import TeamDetail from "../../components/TeamDetail";
import { fetchTeam } from './actions'
import { selectTeam, selectTeamLoading } from "./selectors";
import Spinner from "../../components/Spinner";
import { selectProfileLoading } from "../ProfilePage/selectors";
import { getAllReportsOfTeam } from '../StatisticPage/actions'
import { selectReportsOfTeam, selectStatisticLoading } from "../StatisticPage/selectors";

class TeamDetailContainer extends Component {

  componentDidMount() {
    const {fetchTeam, match, getAllReportsOfTeam, location} = this.props;
    const teamId = match.params.id;
    const teamName = location.state.teamName;
    fetchTeam(teamId);
    getAllReportsOfTeam(teamName);
  }

  render() {
    const {team, teamLoading, statisticLoading, reportsOfTeam} = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          {teamLoading && statisticLoading && isEmpty(team) && isEmpty(reportsOfTeam) ? (
            <Spinner height="650px" style={{fontSize: 32}}/>
          ) : (
            <TeamDetail
              {...this.props}
              reportsOfTeam={reportsOfTeam}
              team={team}
              teamLoading={teamLoading}
            />
          )}
        </div>
      </div>
    );
  }
}

TeamDetailContainer.propTypes = {};

const mapStateToProps = state => ({
  team: selectTeam(state),
  teamLoading: selectTeamLoading(state),
  userLoading: selectProfileLoading(state),
  statisticLoading: selectStatisticLoading(state),
  reportsOfTeam: selectReportsOfTeam(state)
});

export default connect(
  mapStateToProps,
  {fetchTeam, getAllReportsOfTeam}
)(TeamDetailContainer);
