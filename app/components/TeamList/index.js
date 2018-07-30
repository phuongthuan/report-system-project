import React from 'react';
import Team from "./Team";

const TeamList = (props) => {
  const { teamsList } = props;
  return (
    <div
      className="d-flex"
      style={{flexWrap: 'wrap'}}
    >
      {teamsList.map(team =>
        (
          <Team
            key={team.id}
            team={team}
          />
        ) )}
    </div>
  );
};

export default TeamList;
