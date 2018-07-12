import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle, CardText, CardFooter} from 'reactstrap'

const Report = ({ report, deleteAction }) => (
  <Card className="mb-4" key={report.id}>
    <CardBody>
      <CardTitle>Id: {report.id} - {report.title}</CardTitle>
      <CardText>{report.achievement}</CardText>
      <CardText>Member: {report.memberId}</CardText>
      <CardText>
        <small className="text-muted">{report.date}</small>
      </CardText>
    </CardBody>
    <CardFooter>
      <Link to={`/report/update/${report.id}`}>
        <Button size="sm">
          Edit
        </Button>
      </Link>
      <Button
        onClick={() => deleteAction(report.id)}
        size="sm"
        color="danger"
        className="ml-2"
      >
        Delete
      </Button>
    </CardFooter>
  </Card>
);

export default Report;
