import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {

  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {loginAction, history} = this.props;
        loginAction(values);
        // addFlashMessage({
        //   type: 'success',
        //   text: 'You signed in successfully. Welcome!'
        // });
        history.push('/profile/edit');
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;     /*eslint-disable-line no-useless-escape*/
    return (
      <Form onSubmit={this.onSubmitForm} className="login-form">
        <Card title="Login">
          <FormItem>
            {getFieldDecorator('email', {
              rules:
                [
                  {required: true, message: 'Please input your email!'},
                  {max: 32, message: 'Email cannot greater than 32 characters'},
                  {whitespace: true, message: 'Email cannot contain whitespace'},
                  {pattern: regexEmail, message: 'Email cannot contain special characters'},
                ],
            })(
              <Input autoComplete="off" prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              rules:
                [
                  {required: true, message: 'Please input your Password!'},
                ],
            })(
              <Input autoComplete="off" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password"/>
            )}
          </FormItem>
          <FormItem>
            <Button icon="login" type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Card>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;
