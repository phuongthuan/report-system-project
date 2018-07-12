import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap'
import styled from 'styled-components'
import img from '../../assests/images/fancycrave-248220-unsplash.jpg';
import { callLogin } from '../../requests';
import * as actionsType from './actions'
import { selectToken, selectUser, selectError } from "./selectors";

const LoginWrapper = styled.div`
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

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: '',
      password: ''
    }
  }

  onHandleInputChange = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginAction: dispatchLogin, history } = this.props;
    const payload = {
      email,
      password
    }
    dispatchLogin(payload);
    history.push('/profile');
  }

  render() {
    return (
      <LoginWrapper>
        <Form onSubmit={this.onSubmitForm}>
          <Card>
            <CardBody>
              <CardTitle>Login</CardTitle>

              <FormGroup>
                <Input
                  type="text"
                  autoComplete="off"
                  name="email"
                  bsSize="sm"
                  value={this.state.email}
                  onChange={this.onHandleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  autoComplete="off"
                  name="password"
                  bsSize="sm"
                  value={this.state.password}
                  onChange={this.onHandleInputChange}
                  required
                />
              </FormGroup>

              <Button
                color="primary"
                className="w-100"
                size="sm"
                type="submit"
              >
                Login
              </Button>
            </CardBody>
          </Card>
        </Form>
      </LoginWrapper>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  email: PropTypes.string,
  password: PropTypes.string,
  loginAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  token: selectToken(state),
  user: selectUser(state),
  error: selectError(state)
});

const mapDispatchToProps = dispatch => ({
  loginAction: (payload) => dispatch(actionsType.login(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
