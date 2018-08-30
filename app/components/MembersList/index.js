import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import Member from '../Member/index'

const MembersList = ({membersList, user, createMessage, addFlashMessage}) => (
  <Fragment>
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
  </Fragment>
)

MembersList.propTypes = {
  membersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  createMessage: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
}

export default MembersList;
