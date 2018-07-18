import React from 'react';
import Member from '../Member/index'

const MembersList = ({membersList}) => (
  <div>
    {membersList.map(member => (
      <Member key={member.id} member={member} />
    ))}
  </div>
);

export default MembersList;
