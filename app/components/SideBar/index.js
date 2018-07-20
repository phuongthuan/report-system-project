import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Spinner from 'components/Spinner'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Badge,
  ListGroup,
  ListGroupItem,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardImg
} from 'reactstrap';
import imageProfile from '../../assests/images/Gabe_newell.png';
import { selectUser } from "../../containers/Auth/selectors";
import * as AuthPageActions from '../../containers/Auth/actions'
import * as ProfilePageActions from '../../containers/ProfilePage/actions'
import { selectLoading, selectProfile } from "../../containers/ProfilePage/selectors";
import { selectMessages } from "../../containers/Message/selectors";
import { fetchAllMessages } from "../../containers/Message/actions";
import { fetchAllReportsOfUser } from "../../containers/ReportPage/actions";
import { selectReports } from "../../containers/ReportPage/selectors";

class SideBar extends Component {

  state = {
    isLoading: true
  }

  componentDidMount() {
    const {getProfile, user, fetchAllMessages, fetchAllReportsOfUser } = this.props;
    if (user) {
      getProfile(user.id);
      fetchAllMessages(user.id);
      fetchAllReportsOfUser(user.id);
    }
  }

  logout = (e) => {
    const {history} = this.props;
    e.preventDefault();
    this.props.logout();
    history.push('/');
  }

  goToMessagePage = () => {
    const { history } = this.props
    history.push('/message')
  }

  render() {
    const {profile, loading, user, messages, reports} = this.props;
    const avatar = profile ? profile.avatar : imageProfile;
    return (
      <div>
        {loading && isEmpty(profile) && isEmpty(user) ? (
          <FontAwesomeIcon icon="spinner" size="lg" spin/>
        ) : (
          <ListGroup className="shadow-sm">
            <ListGroupItem className="justify-content-between text-center">
              {loading && isEmpty(avatar) ? (
                <Spinner width="238px" height="238px" />
              ) : (
                <CardImg src={avatar} alt="Card image cap"/>
              )}
              <CardBody>
                <CardTitle>{profile.firstName} {profile.lastName}</CardTitle>
                <CardText>
                  <small className="text-muted">
                    <Link to="/profile/edit">
                      <FontAwesomeIcon icon="user-edit" className="mr-2"/>
                      Edit Profile
                    </Link>
                  </small>
                </CardText>
              </CardBody>
            </ListGroupItem>

            {(profile.role) === 'member' &&
            (
              <Fragment>
                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/report/create">
                    <FontAwesomeIcon icon="pencil-alt" className="mr-2"/>
                    Write Daily Report
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/report">
                    <FontAwesomeIcon icon="book" className="mr-2"/>
                    Reports <Badge color="secondary">{reports.length}</Badge>
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Button onClick={this.goToMessagePage} className="p-0" color="link">
                    <FontAwesomeIcon icon="envelope" className="mr-2"/>
                    Messenger <Badge color="warning">{messages.length}</Badge>
                  </Button>
                </ListGroupItem>

              </Fragment>
            )
            }

            {(profile.role) === 'team_leader' &&
            (
              <Fragment>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/statistic">
                    <FontAwesomeIcon icon="chart-area" className="mr-2"/>
                    Statistics
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/member">
                    <FontAwesomeIcon icon="address-card" className="mr-2"/>
                    Members List
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/report">
                    <FontAwesomeIcon icon="book" className="mr-2"/>
                    Reports of Team
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Button onClick={this.goToMessagePage} className="p-0" color="link">
                    <FontAwesomeIcon icon="envelope" className="mr-2"/>
                    Messenger <Badge color="warning">{messages.length}</Badge>
                  </Button>
                </ListGroupItem>

              </Fragment>
            )
            }

            {(profile.role) === 'group_leader' &&
            (
              <Fragment>
                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/statistic/teams">
                    <FontAwesomeIcon icon="list-alt" className="mr-2"/>
                    Teams List
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/member">
                    <FontAwesomeIcon icon="address-card" className="mr-2"/>
                    Members List
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Button onClick={this.goToMessagePage} className="p-0" color="link">
                    <FontAwesomeIcon icon="envelope" className="mr-2"/>
                    Messenger <Badge color="warning">{messages.length}</Badge>
                  </Button>
                </ListGroupItem>

              </Fragment>
            )
            }

            <ListGroupItem tag="a" className="justify-content-between" action>
              <Button
                color="link"
                className="p-0"
                onClick={this.logout}
              >
                <FontAwesomeIcon icon="sign-out-alt" className="mr-2"/>
                Logout
              </Button>
            </ListGroupItem>
          </ListGroup>
        )}
      </div>
    )
  }
}

SideBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  profile: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
  reports: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getProfile: PropTypes.func,
  fetchAllMessages: PropTypes.func,
  fetchAllReportsOfUser: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectLoading(state),
  messages: selectMessages(state),
  reports: selectReports(state)
});

const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(ProfilePageActions.getUserProfile(id)),
  logout: () => dispatch(AuthPageActions.logout()),
  fetchAllMessages: payload => dispatch(fetchAllMessages(payload)),
  fetchAllReportsOfUser: payload => dispatch(fetchAllReportsOfUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
