import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner'
import isEmpty from 'lodash/isEmpty';
import { connect } from "react-redux";

import SideBar from '../../components/SideBar'
import ProfileForm from "../../components/ProfileForm";
import { getUserProfile, updateProfile } from './actions'
import { addFlashMessage } from '../FlashMessage/actions'
import { selectAuthLoading, selectUser } from "../Auth/selectors";
import { selectProfileLoading, selectProfile } from "./selectors";

class ProfileContainer extends Component {

  static propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object,
    getProfile: PropTypes.func,
    updateProfile: PropTypes.func
  };

  componentDidMount() {
    const {getProfile, user} = this.props;
    getProfile(user.id);
  }

  render() {
    const {updateProfile, profile, loading, addFlashMessage, authLoading} = this.props;
    return (
      <div className="container">
        <div className="row mt-5 mb-5">

          <Fragment>
            {loading && isEmpty(profile) ? (
              <Spinner/>
            ) : (
              <Fragment>
                <div className="col-md-4">
                  <SideBar/>
                </div>
                <div className="col-md-8">
                  <div className="shadow-sm">
                    <ProfileForm
                      profile={profile}
                      addFlashMessage={addFlashMessage}
                      updateProfile={updateProfile}
                    />
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
          {/*{*/}
            {/*authLoading ? (*/}
              {/*<Spinner/>*/}
            {/*) : (*/}
              {/**/}
            {/*)*/}
          {/*}*/}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectProfileLoading(state),
  authLoading: selectAuthLoading(state)
});

export const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(getUserProfile(id)),
  updateProfile: payload => dispatch(updateProfile(payload)),
  addFlashMessage: message => dispatch(addFlashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
