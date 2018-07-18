import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup, Card, CardBody, CardTitle, CardText, CardFooter} from 'reactstrap'

const Report = ({ report, deleteReport }) => (
  <Card className="mb-4" key={report.id}>
    <CardBody>
      <CardTitle>Report ID: {report.id} - {report.title}</CardTitle>
      <CardText>{report.achievement}</CardText>
      <CardText>{report.comment}</CardText>
      <CardText>
        <small className="text-muted"><FontAwesomeIcon icon="calendar-alt"/>&nbsp;Date created:&nbsp;&nbsp;{moment(report.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</small>
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
