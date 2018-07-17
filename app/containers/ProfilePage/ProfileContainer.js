import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from "react-redux";
import SideBar from '../../components/SideBar'
import ProfileForm from "../../components/ProfileForm";
import * as ProfilePageActionsType from './actions'
import { selectUser } from "../Auth/selectors";
import { selectLoading, selectProfile } from "./selectors";


class ProfileContainer extends Component {

  componentDidMount() {
    const {getProfile: getUserProfile, user} = this.props;
    getUserProfile(user.id);
  }

  render() {
    const {updateProfile, profile, loading} = this.props;
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            {loading && isEmpty(profile) ? (
              <FontAwesomeIcon icon="spinner" size="lg" spin/>
            ) : (
              <div className="shadow-sm">
                <ProfileForm
                  profile={profile}
                  updateProfile={updateProfile}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  updateProfile: PropTypes.func,
}

export const mapStateToProps = state => ({
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectLoading(state)
});

export const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(ProfilePageActionsType.getUserProfile(id)),
  updateProfile: payload => dispatch(ProfilePageActionsType.updateProfile(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
