import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Button, Icon, Modal } from 'antd';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card, Media, CardBody, CardHeader, CardTitle, CardText, CardFooter
} from 'reactstrap'
import styled from "styled-components";

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

const Image = styled.img`
  width: 38px;
  height: 38px;
`;

class Report extends Component {

  showConfirm = () => {
    const {addFlashMessage, deleteReport, report} = this.props;
    confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this item will be delete immediately',
      onOk() {
        deleteReport(report.id);
        addFlashMessage({
          type: 'success',
          message: 'Delete Report Successful'
        });
      },
      onCancel() {
      },
    });
  }

  render() {
    const {report, user} = this.props;
    const {userId} = report;
    return (
      <Fragment>
        {(user && (user.role === 'member') && (user.id === report.userId.id)) ? (
          <Card
            className="mb-4 border-0 shadow-sm"
            key={report.id}
            style={{borderRadius: '0'}}
          >
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
                <Button>
                  <Icon type="edit"/>
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
                  type="danger"
                  onClick={this.showConfirm}
                  htmlType="submit"
                >
                  Delete<Icon type="delete"/>
                </Button>

              </ButtonGroup>
            </CardFooter>
          </Card>
        ) : (
          <Card
            className="mb-4 border-0 shadow-sm"
            key={report.id}
            style={{borderRadius: '0'}}
          >
            <CardHeader>
              <CardTitle>{report.id} - {report.title}</CardTitle>
            </CardHeader>
            <CardBody>
              <Media>
                <Media left>
                  <Link to={`member/${userId.id}`}>
                    <Image className="mr-3 rounded-circle" src={userId.avatar} alt="Member Profile img"/>
                  </Link>
                </Media>
                <Media body>
                  <Media>
                    <Link to={`member/${userId.id}`}>
                      {userId.firstName} {userId.lastName}
                    </Link>
                  </Media>
                  <CardText>{report.achievement}</CardText>
                  <CardText>{report.comment}</CardText>
                  <CardText>
                    <small className="text-muted">
                      <FontAwesomeIcon icon="calendar-alt"/>&nbsp;Time
                      release: {moment(report.date).format("dddd, MMMM Do YYYY")}
                    </small>
                  </CardText>
                </Media>
              </Media>
            </CardBody>
          </Card>
        )}
      </Fragment>
    );
  }
}

export default Report;
