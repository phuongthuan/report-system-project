import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { updateAuthenticationHeader } from '../../utils/request'
import { addFlashMessage } from '../FlashMessage/actions'
import { login } from './actions'
import LoginForm from "../../components/LoginForm";
import { selectAuthError, selectIsAuthenticated } from "./selectors";
import img from '../../assests/images/neil-rosenstech-752022-unsplash.jpg'

const AuthWrapper = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

class Auth extends Component {

  render() {
    const {addFlashMessage, login, authError, isAuthenticated} = this.props;

    if (isAuthenticated) {
      updateAuthenticationHeader();
      return <Redirect to='/profile/edit'/>
    }

    return (
      <AuthWrapper>
        <LoginForm
          {...this.props}
          authError={authError}
          isAuthenticated={isAuthenticated}
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
  isAuthenticated: PropTypes.bool.isRequired,
  authError: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  authError: selectAuthError(state)
});

export default connect(
  mapStateToProps,
  {addFlashMessage, login}
)(Auth);