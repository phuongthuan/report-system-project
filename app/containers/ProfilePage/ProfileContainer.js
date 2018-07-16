import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import SideBar from '../../components/SideBar'
import ProfileForm from "../../components/ProfileForm";
import * as ProfilePageActionsType from './actions'
import { selectProfile } from "./selectors";

class ProfileContainer extends Component {

  render() {
    const { profile, updateProfile } = this.props;
    console.log('Profile Container', profile);
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            <div className="shadow-sm">
              <ProfileForm
                profile={profile}
                updateProfile={updateProfile}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  updateProfile: PropTypes.func,
}

export const mapStateToProps = state => ({
  profile: selectProfile(state)
});

export const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(ProfilePageActionsType.getUserProfile(id)),
  updateProfile: payload => dispatch(ProfilePageActionsType.updateProfile(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
