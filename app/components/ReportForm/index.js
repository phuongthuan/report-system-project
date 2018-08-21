import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import EmojiMartPicker from 'emoji-mart-picker'
import moment from "moment/moment";
import isEmpty from 'lodash/isEmpty'
import { Button } from 'antd'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import InputField from '../InputField/index'
import AsyncButton from '../AsyncButton/index'
import SelectBox from '../SelectBox/index'
import history from '../../utils/history'

const navigate = () => {
  history.push('/report');
}

const ButtonGroup = Button.Group;

const FormikForm = ({values, setFieldValue, handleSubmit, handleChange, isSubmitting, touched, errors}) => (
  <Form onSubmit={handleSubmit}>
    <Card className="shadow-sm" style={{borderRadius: '0', border: 0}}>
      <CardHeader>
        <CardTitle>
          <FormattedMessage
            id="report.create.form.header.title"
            defaultMessage="Daily Report"
          />
        </CardTitle>
        <Label for="date">{moment(values.date).format("dddd, MMMM Do YYYY")}</Label>
      </CardHeader>
      <CardBody>

        <FormGroup>
          <Label for="emotion">
            <FormattedMessage
              id="report.create.form.field.emotion"
              defaultMessage="Emotion"
            />
          </Label>
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
          label={(
            <FormattedMessage
              id="report.create.form.field.title"
              defaultMessage="Title"
            />
          )}
          name="title"
          value={values.title}
          error={touched.title && errors.title}
          onChange={handleChange}
        />

        <InputField
          type="textarea"
          label={(
            <FormattedMessage
              id="report.create.form.field.achievement"
              defaultMessage="Today Achievement"
            />
          )}
          style={{height: '100px'}}
          name="achievement"
          value={values.achievement}
          error={touched.achievement && errors.achievement}
          onChange={handleChange}
        />

        <SelectBox values={values}/>

        <InputField
          type="textarea"
          label={(
            <FormattedMessage
              id="report.create.form.field.planning"
              defaultMessage="Planning for next day"
            />
          )}
          style={{height: '100px'}}
          name="plan"
          value={values.plan}
          error={touched.plan && errors.plan}
          onChange={handleChange}
        />

        <InputField
          type="textarea"
          label={(
            <FormattedMessage
              id="report.create.form.field.description"
              defaultMessage="Description"
            />
          )}
          style={{height: '100px'}}
          name="description"
          value={values.description}
          error={touched.description && errors.description}
          onChange={handleChange}
        />

        <InputField
          type="textarea"
          label={(
            <FormattedMessage
              id="report.create.form.field.comment"
              defaultMessage="Comment"
            />
          )}
          style={{height: '100px'}}
          name="comment"
          value={values.comment}
          error={touched.comment && errors.comment}
          onChange={handleChange}
        />
      </CardBody>

      <CardFooter>
        <ButtonGroup>
          <AsyncButton
            buttonName={(
              <FormattedMessage
                id="report.create.form.button.submit"
                defaultMessage="Submit"
              />
            )}
            type="primary"
            htmlType="submit"
            icon="form"
            loading={isSubmitting}
          />

          <Button
            onClick={navigate}
          >
            <FormattedMessage
              id="report.create.form.button.back"
              defaultMessage="Back"
            />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  </Form>
);

const ReportForm = withFormik({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    achievement: Yup.string().required('Achievement is required.'),
    plan: Yup.string().required('Plan is required.'),
  }),
  mapPropsToValues: ({report, user}) => {
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
    return report
  },

  handleSubmit: (values, {props, setSubmitting}) => {
    const {createReport, addFlashMessage, updateReport, match, user} = props;
    const isReport = match.params.id;
    setSubmitting(true);
    setTimeout(() => {
      if (isReport) {
        const reportUpdated = Object.assign({}, values, {userId: user.id});
        updateReport(reportUpdated);
        addFlashMessage({
          type: 'success',
          text: 'Update Report Successful.'
        });
      } else {
        createReport(values);
        addFlashMessage({
          type: 'success',
          text: 'Create Report Successful.'
        });
      }
      setSubmitting(false);
    }, 1500)
  },

  displayName: 'ReportForm'

})(FormikForm);

export default ReportForm;