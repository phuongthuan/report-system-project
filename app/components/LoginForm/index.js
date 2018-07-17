import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap'

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
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
    const { loginAction, history, addFlashMessage } = this.props;
    loginAction({ email, password });
    // addFlashMessage({
    //   type: 'success',
    //   text: 'You signed in successfully. Welcome!'
    // });
    history.push('/profile/edit');
  }

  render() {
    const { email, password } = this.state;
    return (
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
    );
  }
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

export default LoginForm;
