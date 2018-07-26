import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Button,
  Input,
  InputGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';

class ProfileForm extends Component {

  state = {
    user: {
      id: '',
      firstName: '',
      lastName: '',
      avatar: '',
      address: '',
      phone: '',
      division: ''
    }
  }

  componentDidMount() {
    const {profile} = this.props;
    this.setState({user: profile});
  }

  onHandleFormChange = (e) => {
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const {user} = this.state;
    const {updateProfile, addFlashMessage} = this.props;
    updateProfile(user);
    addFlashMessage({
      type: 'success',
      text: 'Update Profile Successful'
    });
  };

  render() {
    const {user} = this.state;
    const disabled = (user.role === 'member' || user.role === 'team_leader');
    return (
      <Form onSubmit={this.onSubmitForm}>
        <Card style={{borderRadius: '0'}} className="border-0 shadow-sm">
          <CardHeader>
            Update Profile
          </CardHeader>
          <CardBody>

            <FormGroup>
              <InputGroup>
                <Input
                  disabled="true"
                  bsSize="sm"
                  type="text"
                  name="id"
                  value={user.id}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  name="firstName"
                  bsSize="sm"
                  value={user.firstName}
                  onChange={this.onHandleFormChange}
                  required
                />
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
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  name="avatar"
                  bsSize="sm"
                  value={user.avatar}
                  onChange={this.onHandleFormChange}
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  name="address"
                  bsSize="sm"
                  value={user.address}
                  onChange={this.onHandleFormChange}
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  name="phone"
                  bsSize="sm"
                  value={user.phone}
                  onChange={this.onHandleFormChange}
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  disabled={disabled}
                  type="text"
                  name="division"
                  bsSize="sm"
                  value={user.division}
                />
              </InputGroup>
            </FormGroup>
          </CardBody>

          <CardFooter>
            <Button
              color="secondary"
              type="submit"
              size="sm"
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
  addFlashMessage: PropTypes.func,
}


export default ProfileForm;



