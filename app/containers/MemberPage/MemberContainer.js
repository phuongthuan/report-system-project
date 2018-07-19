import React, { Component } from 'react';
import { connect } from 'react-redux'
import isEmpty from "lodash/isEmpty";
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types'
import SideBar from 'components/SideBar'
import MembersList from 'components/MembersList'
import { fetchAllMembersOfTeam } from './actions'
import { selectMemberLoading, selectMembers } from "./selectors";
import { selectUser } from "../Auth/selectors";

class MemberContainer extends Component {

  static propTypes = {
    user: PropTypes.object,
    members: PropTypes.array,
    loading: PropTypes.bool,
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
              <Spinner />
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
  loading: selectMemberLoading(state)
});

export default connect(
  mapStateToProps,
  {fetchAllMembersOfTeam}
)(MemberContainer);
