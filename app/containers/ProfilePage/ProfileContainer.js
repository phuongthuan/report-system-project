import React, { Component } from 'react';
import SideBar from '../../components/SideBar'
import ProfileForm from "../../components/ProfileForm";

class ProfileContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            <ProfileForm />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
