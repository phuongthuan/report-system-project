import React, { Component } from 'react';
import { connect } from 'react-redux'
import SideBar from 'components/SideBar'
import Navigation from 'components/Navigation'
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";
import TeamList from "../../components/TeamList";
import { selectTeamLoading, selectTeams } from "./selectors";
import { fetchAllTeams } from "./actions";
import { selectUser } from "../Auth/selectors";
import Spinner from "../../components/Spinner";

class TeamContainer extends Component {

  componentDidMount() {
    const {fetchAllTeams, user} = this.props;
    if (user) {
      fetchAllTeams();
    }
  }

  render() {
    const {teams, teamLoading} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <SideBar/>
          </div>
          <div className="col-md-9">

            <Navigation/>

            {teamLoading && isEmpty(teams) ? (
              <Spinner/>
            ) : (
              <TeamList
                teamsList={teams}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

TeamContainer.propTypes = {
  fetchAllTeams: PropTypes.func.isRequired,
  teamLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  user: selectUser(state),
  teams: selectTeams(state),
  teamLoading: selectTeamLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllTeams: () => dispatch(fetchAllTeams())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamContainer);
