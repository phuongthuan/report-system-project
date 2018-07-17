import React from 'react';
import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Card, CardBody, CardTitle, CardText, CardFooter} from 'reactstrap'

const Report = ({ report, deleteReport }) => (
  <Card className="mb-4" key={report.id}>
    <CardBody>
      <CardTitle>Id: {report.id} - {report.title}</CardTitle>
      <CardText>{report.achievement}</CardText>
      <CardText>MemberID: {report.userId}</CardText>
      <CardText>
        <small className="text-muted">{report.date}</small>
      </CardText>
    </CardBody>
    <CardFooter>
      <ButtonGroup>
        <Button size="sm">
          <Link
            style={{
              textDecoration: 'none',
              color: '#fff'
            }}
            to={`/report/update/${report.id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          onClick={() => deleteReport(report.id)}
          size="sm"
          color="danger"
        >
          Delete
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
);

export default Report;
