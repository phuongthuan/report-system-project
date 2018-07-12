import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../../components/SideBar'
import ProfileForm from "../../components/ProfileForm";

class ProfileContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="col-md-8">
          <ProfileForm />
        </div>
      </div>
    );
  }
}

ProfileContainer.propTypes = {};

export default ProfileContainer;
