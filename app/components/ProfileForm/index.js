import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Button,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter
} from 'reactstrap';

class ProfileForm extends Component {
  render() {
    return (
      <Form onSubmit={this.onSubmitForm}>
        <Card>
          <CardHeader>
            <FormGroup>
              <Input
                type="text"
                name="title"
                bsSize="lg"
                autoComplete="off"
                placeholder="Title"
              />
            </FormGroup>
          </CardHeader>

          <CardBody>

            <CardTitle>Today Achievement</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="achievement"
                placeholder="What achievement did you get today ?"
                bsSize="sm"
              />
            </FormGroup>

            <CardTitle>Planing for next day</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="plan"
                placeholder="Tomorrow I'll bla bla ..."
                bsSize="sm"
              />
            </FormGroup>

            <CardTitle>Description</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="description"
                bsSize="sm"
                placeholder="More info ..."
              />
            </FormGroup>

            <CardTitle>Comment</CardTitle>
            <FormGroup>
              <Input
                type="textarea"
                name="comment"
                bsSize="sm"
                placeholder="Leave a comment ..."
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Form>
    );
  }
}

export default ProfileForm;
