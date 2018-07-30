import React from 'react';
import Member from '../Member/index'

const MembersList = ({membersList, user, createMessage, addFlashMessage}) => (
  <div>

    {membersList.filter(member =>
      member.id !== user.id)
      .map(member => (
        <Member
          user={user}
          addFlashMessage={addFlashMessage}
          createMessage={createMessage}
          key={member.id}
          member={member}
        />
      ))
    }
  </div>
);

export default MembersList;
