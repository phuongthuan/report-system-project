import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import img from '../../assests/images/fancycrave-248220-unsplash.jpg';
import * as AuthActions from './actions'
import * as FlashMessageActions from '../FlashMessage/actions'
import { selectAuthLoading, selectUser } from "./selectors";
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
    const { addFlashMessage, loginAction } = this.props;
    return (
      <AuthWrapper>
        <LoginForm
          {...this.props}
          loginAction={loginAction}
          addFlashMessage={addFlashMessage}
        />
      </AuthWrapper>
    );
  }
}

Auth.propTypes = {
  loginAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  loginAction: payload => dispatch(AuthActions.login(payload)),
  addFlashMessage: message => dispatch(FlashMessageActions.addFLashMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
