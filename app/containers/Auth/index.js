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
import * as AuthActions from './actions'
import { selectUser } from "./selectors";


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

  constructor(props) {
    super(props);

    // Reset login status:
    this.props.logoutAction();

    this.state = {
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
    const {
      loginAction: dispatchLogin,
      history
    } = this.props;

    dispatchLogin({ email, password });
    history.push('/profile/edit');
  }

  render() {
    const { email, password } = this.state;
    return (
      <AuthWrapper>
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
                  value={email}
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
                  value={password}
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
      </AuthWrapper>
    );
  }
}

Auth.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  email: PropTypes.string,
  password: PropTypes.string,
  loginAction: PropTypes.func,
  logoutAction: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  loginAction: (payload) => dispatch(AuthActions.login(payload)),
  logoutAction: () => dispatch(AuthActions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
