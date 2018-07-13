import React, { Fragment } from 'react';
import {
  FormGroup,
  Button,
  Col,
  CardTitle,
} from 'reactstrap';

const IssueSelect = ({addSelectBox, children}) => {
  return (
    <Fragment>
      <CardTitle>Issues</CardTitle>
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
