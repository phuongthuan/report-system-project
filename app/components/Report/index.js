import React from 'react';
import { Card, CardBody, CardTitle, CardText} from 'reactstrap'

const Report = ({ report }) => (
  <Card className="mb-4" key={report.id}>
    <CardBody>
      <CardTitle>{report.title}</CardTitle>
      <CardText>{report.achievement}</CardText>
      <CardText>Member: {report.memberId}</CardText>
      <CardText>
        <small className="text-muted">{report.date}</small>
      </CardText>
    </CardBody>
  </Card>
);

export default Report;
