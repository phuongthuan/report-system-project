import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button, Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter, ButtonGroup, Card, CardBody, CardTitle, CardText, CardFooter
} from 'reactstrap'

class Report extends Component {

  state = {
    modal: false
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { addFlashMessage, deleteReport, report } = this.props;
    deleteReport(report.id)
    addFlashMessage({
      type: 'success',
      text: 'Delete Report Successful'
    });
  };

  toggle = () => {
    const {modal} = this.state;
    this.setState({
      modal: !modal
    });
  }

  render() {
    const {report, user} = this.props;
    const { userId } = report;
    return (
      <Fragment>
        {(user && user.role === 'member' && user.id === report.userId) ? (
          <Card className="mb-4" key={report.id}>
            <CardBody>
              <CardTitle>{report.id} - {report.title}</CardTitle>
              <CardText>{report.achievement}</CardText>
              <CardText>{report.comment}</CardText>
              <CardText>
                <small className="text-muted"><FontAwesomeIcon icon="calendar-alt"/>&nbsp;Date
                  created:&nbsp;&nbsp;{moment(report.date).format("dddd, MMMM Do YYYY")}
                </small>
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
                  onClick={this.toggle}
                  size="sm"
                  color="danger"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ) : (
          <Card className="mb-4" key={report.id}>
            <CardBody>
              <CardTitle>{report.id} - {report.title}</CardTitle>
              <CardText>
                <small className="text-muted">
                  <FontAwesomeIcon icon="user-tie"/>
                  &nbsp;&nbsp;Created by:&nbsp;
                  <Link to={`member/${userId.id}`}>
                    {userId.firstName} {userId.lastName}
                  </Link>
                </small>
              </CardText>
              <br/>
              <CardText>{report.achievement}</CardText>
              <CardText>{report.comment}</CardText>
              <CardText>
                <small className="text-muted"><FontAwesomeIcon icon="clock"/>&nbsp;Time
                  release: {moment(report.date).format("dddd, MMMM Do YYYY")}
                </small>
              </CardText>
            </CardBody>
          </Card>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <Form onSubmit={this.onSubmitForm}>
            <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
            <ModalBody>
              Are you sure want to delete this report?
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  color="danger"
                  type="submit"
                  required
                >Delete
                </Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default Report;
