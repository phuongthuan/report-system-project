import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../FlashMessage/actions'
import { login } from './actions'
import LoginForm from "../../components/LoginForm";
import { selectAuthError } from "./selectors";

class Auth extends Component {

  render() {
    const {addFlashMessage, login, authError} = this.props;
    return (
      <LoginForm
        {...this.props}
        authError={authError}
        login={login}
        addFlashMessage={addFlashMessage}
      />
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