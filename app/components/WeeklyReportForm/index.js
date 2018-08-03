import React from 'react';
import { withFormik } from 'formik'
import { Form } from 'reactstrap'
import * as Yup from 'yup'
import moment from "moment/moment";
import AsyncButton from "../AsyncButton";
import InputField from '../InputField/index';

const FormikForm = ({values, handleSubmit, handleChange, isSubmitting, touched, errors}) => (
  <Form onSubmit={handleSubmit}>
    <InputField
      type="textarea"
      name="issue"
      value={values.issue}
      placeholder="Issue..."
      error={touched.issue && errors.issue}
      onChange={handleChange}
    />

    <InputField
      type="textarea"
      style={{height: '100px'}}
      name="solution"
      value={values.solution}
      placeholder="Solution..."
      error={touched.solution && errors.solution}
      onChange={handleChange}
    />

    <InputField
      type="textarea"
      style={{height: '100px'}}
      name="description"
      value={values.description}
      placeholder="Description..."
      error={touched.description && errors.description}
      onChange={handleChange}
    />

    <InputField
      type="textarea"
      style={{height: '100px'}}
      name="summary"
      value={values.summary}
      placeholder="Summary..."
      error={touched.summary && errors.summary}
      onChange={handleChange}
    />
    <AsyncButton
      buttonName="Submit"
      type="primary"
      htmlType="submit"
      icon="enter"
      loading={isSubmitting}
    />
  </Form>
)

const WeeklyReportForm = withFormik({
  validationSchema: Yup.object().shape({
    issue: Yup.string().required('Issue is required.'),
    solution: Yup.string().required('Solution is required.'),
    description: Yup.string().required('Description is required.'),
    summary: Yup.string().required('Summary is required.')
  }),
  mapPropsToValues: ({user}) => ({
    date: moment().toString(),
    userId: user.id,
    issue: '',
    solution: '',
    description: '',
    summary: ''
  }),
  handleSubmit: (values, {props, setSubmitting}) => {
    const {createWeeklyReport, addFlashMessage, toggle} = props;
    setSubmitting(true);
    setTimeout(() => {
      createWeeklyReport(values);
      addFlashMessage({
        type: 'success',
        text: 'Create Weekly Report Successful'
      });
      toggle();
      setSubmitting(false);
    }, 1500)
  },
  displayName: 'WeeklyReportForm'
})(FormikForm)

export default WeeklyReportForm;