import React, { Fragment } from 'react';
import {
  FormGroup,
  Button,
  Col,
  Label,
} from 'reactstrap';

const IssueSelect = ({addSelectBox, children}) => {
  return (
    <Fragment>
      <Label for="issues">Issues</Label>
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
