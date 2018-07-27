import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { addFlashMessage } from '../FlashMessage/actions'
import { login } from './actions'
import LoginForm from "../../components/LoginForm";
import { selectAuthError } from "./selectors";

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
    const {addFlashMessage, login, authError} = this.props;
    return (
      <AuthWrapper>
        <LoginForm
          {...this.props}
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
}

const mapStateToProps = state => ({
  authError: selectAuthError(state)
});

export default connect(
  mapStateToProps,
  {addFlashMessage, login}
)(Auth);