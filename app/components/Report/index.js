import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Button, Icon, Modal } from 'antd';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card, CardBody, CardTitle, CardText, CardFooter
} from 'reactstrap'

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

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
          text: 'Report has been deleted.'
        });
      },
      onCancel() {
      },
    });
  }

  render() {
    const {report, user} = this.props;
    return (
      <Fragment>
        {(user && (user.role === 'member') && (user.id === report.userId)) && (
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
        )}
      </Fragment>
    );
  }
}

export default Report;
