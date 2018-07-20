import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup, CardSubtitle, Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap'
import { selectMember } from "../../containers/MemberPage/selectors";
import { getMemberProfile } from "../../containers/MemberPage/actions";

class Report extends Component {

  componentDidMount() {
    const { getMember, report } = this.props;
    getMember(report.userId);
  }

  render() {
    const { report, deleteReport, user, member } = this.props;
    return (
      <Fragment>
        {(user && user.role === 'member') ? (
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
                  onClick={() => deleteReport(report.id)}
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
                  <Link to={`member/${report.userId}`}>
                    {member.firstName} {member.lastName}
                  </Link>
                </small>
              </CardText>
              <br />
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  member: selectMember(state)
});

const mapDispatchToProps = dispatch => ({
  getMember: id => dispatch(getMemberProfile(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
