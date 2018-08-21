import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types'
import MembersList from '../../components/MembersList'
import { fetchAllMembersOfTeam, fetchAllMembers } from './actions'
import { addFlashMessage } from '../FlashMessage/actions'
import { createMessage } from '../Message/actions'
import { selectMemberLoading, selectMembers } from "./selectors";
import { selectUser } from "../Auth/selectors";
import { selectFlashMessage } from "../FlashMessage/selectors";
import MemberTable from '../../components/MemberTable/index'

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
`;

class MemberContainer extends Component {

  static propTypes = {
    user: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }).isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,

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

  membersList = () => {
    const {members, createMessage, addFlashMessage, user} = this.props;
    if (user.role === 'group_leader') {
      return (
        <MemberTable
          addFlashMessage={addFlashMessage}
          createMessage={createMessage}
          {...this.props}
          user={user}
          data={members}
        />
      )
    } else if (user.role === 'team_leader') {
      return (
        (
          <MembersList
            {...this.props}
            user={user}
            createMessage={createMessage}
            addFlashMessage={addFlashMessage}
            membersList={members}
          />
        )
      )
    }
  }

  render() {
    const {members, loading} = this.props;
    return (
      <Wrapper>
        <div className="row">
          <div className="col-md-12">
            {loading && isEmpty(members) ? (
              <Spinner height="650px" style={{fontSize: 32}}/>
            ) : this.membersList()}
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  members: selectMembers(state),
  user: selectUser(state),
  loading: selectMemberLoading(state),
  messages: selectFlashMessage(state)
});

export default connect(
  mapStateToProps,
  {fetchAllMembersOfTeam, fetchAllMembers, createMessage, addFlashMessage}
)(MemberContainer);
