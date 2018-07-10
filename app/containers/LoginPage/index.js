import React, { Component } from 'react';
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
import { callLogin, callSearchUsername } from '../../requests';


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

  // onHandleInputChange = (e) => {
  //   const target = e.target;
  //   this.setState({
  //     [target.name]: target.value
  //   });
  // }

  onHandleEmailInput = (e) => {
    this.setState({email: e.target.value});
  }

  onHandlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const payload = {
      email,
      password
    }
    callLogin(payload)
      .then(response => console.log(response));
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
                  onChange={this.onHandleEmailInput}
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
                  onChange={this.onHandlePasswordInput}
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

export default LoginPage;
