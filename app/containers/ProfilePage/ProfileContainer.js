import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner'
import isEmpty from 'lodash/isEmpty';
import { connect } from "react-redux";
import styled from 'styled-components'
import ProfileForm from "../../components/ProfileForm";
import { getUserProfile, updateProfile } from './actions'
import { addFlashMessage } from '../FlashMessage/actions'
import { selectAuthLoading, selectIsAuthenticated, selectUser } from "../Auth/selectors";
import { selectProfileLoading, selectProfile } from "./selectors";

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
`;

class ProfileContainer extends Component {

  static propTypes = {
    user: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }).isRequired,
    profile: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    authLoading: PropTypes.bool.isRequired,

    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {getProfile, user, isAuthenticated} = this.props;
    if (user && isAuthenticated) {
      getProfile(user.id);
    }
  }

  render() {
    const {updateProfile, profile, loading, addFlashMessage, user, authLoading} = this.props;
    return (
      <Wrapper>
        {authLoading && isEmpty(user) ? (
          <Spinner height="500px" style={{fontSize: 32}}/>
        ) : (
          <div className="row">
            {loading && isEmpty(profile) ? (
              <div className="col-md-12">
                <Spinner height="500px" style={{fontSize: 32}}/>
              </div>
            ) : (
              <div className="col-md-12">
                <ProfileForm
                  profile={profile}
                  addFlashMessage={addFlashMessage}
                  updateProfile={updateProfile}
                />
              </div>
            )}
          </div>
        )}
      </Wrapper>
    );
  }
}

export const mapStateToProps = state => ({
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectProfileLoading(state),
  authLoading: selectAuthLoading(state),
  isAuthenticated: selectIsAuthenticated(state)
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
