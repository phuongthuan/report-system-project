import React, { Fragment } from 'react';
import {
  FormGroup,
  Button,
  Col,
  CardSubtitle,
} from 'reactstrap';

const IssueSelect = ({addSelectBox, children}) => {
  return (
    <Fragment>
      <CardSubtitle>Issues</CardSubtitle>
      {children}
      <FormGroup row>
        <Col>
          <Button
            onClick={addSelectBox}
            color="link"
          >
            + Add new issue
          </Button>
        </Col>
      </FormGroup>
    </Fragment>
  );
};

export default IssueSelect;
