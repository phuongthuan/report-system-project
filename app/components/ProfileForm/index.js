import React from 'react';
import { FormattedMessage } from 'react-intl'
import {
  Form,
  CardTitle,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import AsyncButton from "../AsyncButton";
import InputField from '../InputField/index';

const FormikForm = ({values, handleSubmit, handleChange, isSubmitting, touched, errors}) => (
  <Form onSubmit={handleSubmit}>
    <Card style={{borderRadius: '0'}} className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>
          <FormattedMessage
            id="report.update.form.header.title"
            defaultMessage="Update Profile"
          />
        </CardTitle>
      </CardHeader>
      <CardBody>

        <InputField
          disabled="true"
          type="text"
          name="id"
          value={values.id}
        />

        <InputField
          type="text"
          name="firstName"
          value={values.firstName}
          error={touched.firstName && errors.firstName}
          onChange={handleChange}
        />

        <InputField
          type="text"
          name="lastName"
          value={values.lastName}
          error={touched.lastName && errors.lastName}
          onChange={handleChange}
        />

        <InputField
          type="text"
          name="avatar"
          value={values.avatar}
          error={touched.avatar && errors.avatar}
          onChange={handleChange}
        />

        <InputField
          type="text"
          name="address"
          value={values.address}
          error={touched.address && errors.address}
          onChange={handleChange}
        />

        <InputField
          type="text"
          name="phone"
          value={values.phone}
          error={touched.phone && errors.phone}
          onChange={handleChange}
        />

        <InputField
          disabled="true"
          type="text"
          name="division"
          value={values.division}
        />

      </CardBody>

      <CardFooter>
        <AsyncButton
          buttonName={<FormattedMessage id="report.update.form.button.save" defaultMessage="Save"/>}
          type="primary"
          htmlType="submit"
          icon="save"
          loading={isSubmitting}
        />
      </CardFooter>

    </Card>
  </Form>
)

const ProfileForm = withFormik({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    avatar: Yup.string().matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/, 'Image is invalid').required('Avatar is required.'),
    address: Yup.string().required('Address is required.'),
    phone: Yup.string().matches(/(09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number is invalid.').required('Phone is required.'),
  }),

  mapPropsToValues: ({profile}) => ({
    ...profile
  }),

  handleSubmit: (values, {props, setSubmitting}) => {
    const {updateProfile, addFlashMessage} = props;
    setSubmitting(true);
    setTimeout(() => {
      updateProfile(values);
      addFlashMessage({
        type: 'success',
        text: <FormattedMessage
          id="report.flash.message.update.success"
          defaultMessage="Update Successful"
        />
      });
      setSubmitting(false);
    }, 1500)
  },

  displayName: 'ProfileForm'
})(FormikForm)

export default ProfileForm;



