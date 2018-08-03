import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, withFormik, Field } from 'formik'
import * as Yup from 'yup'
import EmojiMartPicker from 'emoji-mart-picker'
import moment from "moment/moment";
import isEmpty from 'lodash/isEmpty'
import { FormGroup, Label, Input, Form, Button, Card, CardHeader, CardFooter, CardTitle, CardBody } from 'reactstrap'
import InputField from '../InputField/index'
import AsyncButton from '../AsyncButton/index'
import SelectBox from '../SelectBox/index'


// const ReportForm = () => (
//   <Formik
//     initialValues={{
//       email: '',
//       password: '',
//     }}
//
//   />
// )


const FormikForm = ({values, setFieldValue, handleSubmit, handleChange, isSubmitting, touched, errors}) => (
  <Form onSubmit={handleSubmit}>
    <Card style={{borderRadius: '0'}} className="border-0 shadow-sm">

      <CardHeader>
        <CardTitle>Write Daily Report</CardTitle>
        <Label for="date">{values.date}</Label>
      </CardHeader>
      <CardBody>

        <FormGroup>
          <EmojiMartPicker
            set='emojione'
            onChange={emoji => setFieldValue('emotion', emoji)}
          >
            <Input
              type="text"
              name="emotion"
              bsSize="sm"
              autoComplete="off"
              value={values.emotion.native}
              onChange={handleChange}
              required
            />
          </EmojiMartPicker>
        </FormGroup>

        <InputField
          type="text"
          label="Title"
          name="title"
          value={values.title}
          placeholder="Title..."
          error={touched.title && errors.title}
          onChange={handleChange}
        />

        <InputField
          type="textarea"
          label="Today Achievement"
          style={{height: '100px'}}
          name="achievement"
          value={values.achievement}
          placeholder="What achievement did you get today ?"
          error={touched.achievement && errors.achievement}
          onChange={handleChange}
        />

        <SelectBox values={values} />

        <InputField
          type="textarea"
          label="Planing for next day"
          style={{height: '100px'}}
          name="plan"
          value={values.plan}
          placeholder="Tomorrow I'll bla bla ..."
          error={touched.plan && errors.plan}
          onChange={handleChange}
        />

        <InputField
          type="textarea"
          label="Description"
          style={{height: '100px'}}
          name="description"
          value={values.description}
          placeholder="Description..."
          error={touched.description && errors.description}
          onChange={handleChange}
        />

        <InputField
          type="textarea"
          label="Comment"
          style={{height: '100px'}}
          name="comment"
          value={values.comment}
          placeholder="Leave a comment ..."
          error={touched.comment && errors.comment}
          onChange={handleChange}
        />
      </CardBody>

      <CardFooter>
        <AsyncButton
          buttonName="Create new report"
          type="primary"
          htmlType="submit"
          icon="enter"
        />

        <Button size="sm">
          <Link
            style={{
              textDecoration: 'none',
              color: '#fff'
            }}
            to="/report"
          >
            Back to Report Page
          </Link>
        </Button>
      </CardFooter>

    </Card>
  </Form>
);

const ReportForm = withFormik({
  mapPropsToValues: ({report, user }) => {
    if (isEmpty(report)) {
      return {
        date: moment().format("YYYY-MM-DD"),
        emotion: {
          id: 'smiley',
          name: 'Smiling Face with Open Mouth',
          colons: ':smiley:',
          text: ':)',
          emoticons: [
            '=)',
            '=-)'
          ],
          skin: null,
          native: '😃'
        },
        userId: user.id,
        title: '',
        achievement: '',
        plan: '',
        issues: [],
        description: '',
        comment: ''
      }
    }

    return report;
  },

  handleSubmit: (values, {props, setSubmitting}) => {
    console.log(values);
  }

})(FormikForm);

export default ReportForm;