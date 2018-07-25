import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import img from '../../assests/images/fancycrave-248220-unsplash.jpg';
import { addFlashMessage } from '../FlashMessage/actions'
import { login } from './actions'
import LoginForm from "../../components/LoginForm";

const AuthWrapper = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Auth extends Component {

  render() {
    const {addFlashMessage, login} = this.props;
    return (
      <AuthWrapper>
        <LoginForm
          {...this.props}
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

export default connect(
  null,
  {addFlashMessage, login}
)(Auth);