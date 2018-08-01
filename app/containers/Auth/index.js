import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { addFlashMessage } from '../FlashMessage/actions'
import { login } from './actions'
import LoginForm from "../../components/LoginForm";
import { selectAuthError, selectUser } from "./selectors";

const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

class Auth extends Component {

  render() {
    const {addFlashMessage, login, authError, user} = this.props;
    if (user) {
      return <Redirect to='/profile/edit' />
    }
    return (
      <AuthWrapper>
        <LoginForm
          {...this.props}
          user={user}
          authError={authError}
          login={login}
          addFlashMessage={addFlashMessage}
        />
      </AuthWrapper>
    );
  }
}

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  authError: selectAuthError(state),
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  {addFlashMessage, login}
)(Auth);