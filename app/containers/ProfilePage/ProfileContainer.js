import React, { Component } from 'react';
import { connect } from "react-redux";
import SideBar from '../../components/SideBar'
import ProfileForm from "../../components/ProfileForm";
import { selectCurrentUser } from "../App/selectors";

class ProfileContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            <ProfileForm user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: selectCurrentUser(state),
});

export const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
