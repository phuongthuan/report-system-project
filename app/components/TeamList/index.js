import React from 'react';
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

export default TeamList;
