import React from 'react';
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
          Update Profile
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
          placeholder="Solution..."
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
          placeholder="Summary..."
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
          buttonName="Save"
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
    phone: Yup.string().matches(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/, 'Phone number is invalid.').required('Phone is required.'),
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
        text: 'Update Profile Successful'
      });
      setSubmitting(false);
    }, 1500)
  },

  displayName: 'ProfileForm'
})(FormikForm)

export default ProfileForm;



