import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import PropTypes from 'prop-types'
import SideBar from 'components/SideBar'
import MembersList from 'components/MembersList'
import { fetchAllMembersOfTeam } from './actions'
import { selectLoading, selectMembers } from "./selectors";
import { selectUser } from "../Auth/selectors";

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class MemberContainer extends Component {

  static propTypes = {
    user: PropTypes.object,
    members: PropTypes.array,
    fetchAllMembersOfTeam: PropTypes.func,
  }

  componentDidMount() {
    const {fetchAllMembersOfTeam, user} = this.props;
    fetchAllMembersOfTeam(user.division);
  }

  render() {
    const {members, loading} = this.props;
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar/>
          </div>
          <div className="col-md-8">
            {loading && isEmpty(members) ? (
              <Spinner>
                <FontAwesomeIcon icon="spinner" size="lg" spin/>
              </Spinner>
            ) : (
              <MembersList
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
  loading: selectLoading(state)
});

export default connect(
  mapStateToProps,
  {fetchAllMembersOfTeam}
)(MemberContainer);
