import React from 'react';
import PropTypes from 'prop-types'
import Team from "./Team";

const TeamList = (props) => {
  const {teamsList, fetchAllReportsOfTeam} = props;
  return (
    <div className="d-flex flex-column">
      {teamsList.map(team =>
        (
          <Team
            fetchAllReportsOfTeam={fetchAllReportsOfTeam}
            key={team.id}
            team={team}
          />
        ) )}
    </div>
  );
};

TeamList.propTypes = {
  teamsList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  fetchAllReportsOfTeam: PropTypes.func.isRequired,
}

export default TeamList;
