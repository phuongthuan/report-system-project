import React from 'react';
import Team from "./Team";

const TeamList = (props) => {
  const { teamsList } = props;
  return (
    <div>
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
