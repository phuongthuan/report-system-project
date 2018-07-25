import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types'
import SideBar from 'components/SideBar'
import MembersList from 'components/MembersList'
import { fetchAllMembersOfTeam, fetchAllMembers } from './actions'
import { addFlashMessage } from '../FlashMessage/actions'
import { createMessage } from '../Message/actions'
import { selectMemberLoading, selectMembers } from "./selectors";
import { selectUser } from "../Auth/selectors";

class MemberContainer extends Component {

  static propTypes = {
    user: PropTypes.object,
    members: PropTypes.array,
    loading: PropTypes.bool,
    fetchAllMembersOfTeam: PropTypes.func,
    fetchAllMembers: PropTypes.func,
    createMessage: PropTypes.func,
    addFlashMessage: PropTypes.func,
  }

  componentDidMount() {
    const {fetchAllMembersOfTeam, fetchAllMembers, user} = this.props;
    if (user && (user.role === 'team_leader')) {
      fetchAllMembersOfTeam(user.division);
    }

    if (user && (user.role === 'group_leader')) {
      fetchAllMembers();
    }
  }

  render() {
    const {members, loading, createMessage, addFlashMessage, user} = this.props;

    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar/>
          </div>
          <div className="col-md-8">
            {loading && isEmpty(members) ? (
              <Spinner />
            ) : (
              <MembersList
                user={user}
                createMessage={createMessage}
                addFlashMessage={addFlashMessage}
                membersList={members}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  members: selectMembers(state),
  user: selectUser(state),
  loading: selectMemberLoading(state)
});

export default connect(
  mapStateToProps,
  {fetchAllMembersOfTeam, fetchAllMembers, createMessage, addFlashMessage }
)(MemberContainer);
