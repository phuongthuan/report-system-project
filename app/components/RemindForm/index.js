import React from 'react'
import { withFormik } from 'formik'
import { Form } from 'reactstrap'
import * as Yup from "yup";
import moment from "moment/moment";
import InputField from '../InputField/index'
import AsyncButton from '../AsyncButton/index'

const FormikForm = ({values, handleSubmit, handleChange, isSubmitting, touched, errors}) => (
  <Form onSubmit={handleSubmit}>
    <InputField
      type="text"
      name="title"
      value={values.title}
      placeholder="Title..."
      error={touched.title && errors.title}
      onChange={handleChange}
    />

    <InputField
      type="textarea"
      style={{height: '100px'}}
      name="message"
      value={values.message}
      placeholder="Message..."
      error={touched.message && errors.message}
      onChange={handleChange}
    />
    <AsyncButton
      buttonName="Sent"
      type="primary"
      htmlType="submit"
      loading={isSubmitting}
    />
  </Form>
)

const RemindForm = withFormik({

  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    message: Yup.string().required('Message is required.'),
  }),

  mapPropsToValues: ({user, member}) => ({
    date: moment().format("YYYY-MM-DD"),
    userId: user.id,
    toUser: member.id,
    title: '',
    message: ''
  }),

  handleSubmit: (values, {props, setSubmitting}) => {
    const {createMessage, addFlashMessage, toggle} = props;
    setSubmitting(true);
    setTimeout(() => {
      createMessage(values);
      addFlashMessage({
        type: 'success',
        text: 'Message has been sent.'
      });
      toggle();
      setSubmitting(false);
    }, 1500)
  },

  displayName: 'RemindForm'
})(FormikForm)

export default RemindForm;