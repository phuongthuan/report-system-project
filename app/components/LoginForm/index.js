import React from 'react';
import { withFormik } from 'formik'
import AsyncButton from 'components/AsyncButton'
import * as Yup from 'yup';
import {
  Form,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap'
import InputField from '../InputField/index'

const LoginFormikForm = ({
                           values,
                           errors,
                           handleChange,
                           handleSubmit,
                           touched,
                           isSubmitting
                         }) => (
  <Form onSubmit={handleSubmit}>
    <Card>
      <CardHeader>
        Login
      </CardHeader>
      <CardBody>
        <InputField
          type="email"
          name="email"
          value={values.email}
          error={touched.email && errors.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          value={values.password}
          error={touched.password && errors.password}
          onChange={handleChange}
        />
        <AsyncButton
          buttonName="Login"
          htmlType="submit"
          type="primary"
          icon="login"
          loading={isSubmitting}
        />
      </CardBody>
    </Card>
  </Form>
)

const LoginForm = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .min(6, "Password must be more than 6 characters.")
      .required('Password is required.'),
  }),

  mapPropsToValues: ({email, password}) => ({
    email: email || '',
    password: password || ''
  }),

  handleSubmit: (values, {props, setSubmitting}) => {
    const {login, history, addFlashMessage, isAuthenticated} = props;
    setSubmitting(true);
    setTimeout(() => {
      login(values);

      addFlashMessage({
        type: 'success',
        text: 'You signed in successfully. Welcome!'
      });
      if (isAuthenticated) {
        history.push('/profile/edit');
      }
      setSubmitting(false);
    }, 2000)
  },
  displayName: 'LoginForm'
})(LoginFormikForm);

export default LoginForm;
