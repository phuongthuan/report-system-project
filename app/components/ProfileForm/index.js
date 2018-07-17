import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Form,
  FormGroup,
  Button,
  Input,
  InputGroup,
  Card,
  CardBody,
  CardFooter,
  InputGroupAddon
} from 'reactstrap';

class ProfileForm extends Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      avatar: '',
      address: '',
      phone: '',
      division: ''
    }
  }

  componentDidMount() {
    const { profile } = this.props;
    this.setState({user: profile});
  }

  onHandleFormChange = (e) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { updateProfile, history } = this.props;
    updateProfile(user);
    console.log('Update Profile Submitted!', user);
  };

  render() {
    const { user } = this.state;
    return (
      <Form onSubmit={this.onSubmitForm}>
        <Card>
          <CardBody>
            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="firstName"
                  autoComplete="off"
                  bsSize="sm"
                  value={user.firstName}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">First name</InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  bsSize="sm"
                  value={user.lastName}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">Last name</InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  bsSize="sm"
                  value={user.avatar}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">Avatar</InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="address"
                  autoComplete="off"
                  bsSize="sm"
                  value={user.address}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="phone"
                  bsSize="sm"
                  autoComplete="off"
                  value={user.phone}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">Phone</InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="division"
                  bsSize="sm"
                  autoComplete="off"
                  value={user.division}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">Division</InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button
              color="secondary"
              type="submit"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </Form>
    );
  }
}

ProfileForm.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
}

export default withRouter(ProfileForm);