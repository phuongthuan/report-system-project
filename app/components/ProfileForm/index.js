import React, { Component } from 'react';
import { connect } from 'react-redux'
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
import { selectUser } from "../../containers/Auth/selectors";

class ProfileForm extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({user});
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

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <Form>
        <Card>
          <CardBody>
            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  bsSize="sm"
                  value={user.firstName}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">@First name</InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  bsSize="sm"
                  value={user.lastName}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">@Last name</InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  bsSize="sm"
                  value={user.address}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">@Address</InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  bsSize="sm"
                  value={user.phone}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">@Phone</InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type="text"
                  bsSize="sm"
                  value={user.division}
                  onChange={this.onHandleFormChange}
                />
                <InputGroupAddon addonType="prepend">@Division</InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
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
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);
