import React, { Component } from 'react';
import { connect } from 'react-redux'
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
      <div className="row">
        <div className="col-md-12">
          {teamLoading && isEmpty(teams) ? (
            <Spinner height="650px" style={{fontSize: 32}}/>
          ) : (
            <TeamList
              teamsList={teams}
            />
          )}
        </div>
      </div>
    );
  }
}

TeamContainer.propTypes = {
  teamLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllTeams: PropTypes.func.isRequired
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
