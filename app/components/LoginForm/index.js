import React, { Component } from 'react';
import AsyncButton from 'components/AsyncButton';
import isEmpty from 'lodash/isEmpty'
import Validator from "validator";
import {
  Form,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap'
import InputField from '../InputField/index'

class LoginForm extends Component {

  state = {
    user: {
      email: '',
      password: '',
    },
    errors: {},
    submitting: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.authError });
  }

  handleChange = (e) => {
    const { user } = this.state;
    this.setState({
      user: { ...user, [e.target.name]: e.target.value }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {login, addFlashMessage } = this.props;
    const { user } = this.state;

    const payload = {
      email: user.email,
      password: user.password
    }

    const errors = this.validate(user);
    this.setState({ errors });

    if (isEmpty(errors)) {
      this.setState({submitting: true});
      setTimeout(() => {
        login(payload);
        addFlashMessage({
          type: 'success',
          text: 'You signed in successfully. Welcome!'
        });
        this.setState({submitting: false});
      }, 2000)
    }
  }

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Password is required";
    return errors;
  };

  render() {
    const { email, password, submitting, errors } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Card>
          <CardHeader>
            Login
          </CardHeader>
          <CardBody>
            <InputField
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={errors.email}
            />
            <InputField
              type="password"
              name="password"
              value={password}
              error={errors.password}
              onChange={this.handleChange}
            />
            <AsyncButton
              buttonName="Login"
              htmlType="submit"
              type="primary"
              icon="login"
              loading={submitting}
            />
            {errors.message && (
              <div
                className="mt-2"
                style={{color: 'red'}}
              >
                {errors.message}
              </div>
            )}
          </CardBody>
        </Card>
      </Form>
    );
  }
}

LoginForm.propTypes = {};

export default LoginForm;
