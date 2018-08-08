import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Icon, Affix } from 'antd'
import Spinner from 'components/Spinner'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import {
  ListGroup,
  ListGroupItem,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Badge,
  CardImg
} from 'reactstrap';
import imageProfile from '../../assests/images/Gabe_newell.png';
import { selectUser } from "../../containers/Auth/selectors";
import * as AuthPageActions from '../../containers/Auth/actions'
import * as ProfilePageActions from '../../containers/ProfilePage/actions'
import { selectProfileLoading, selectProfile } from "../../containers/ProfilePage/selectors";
import { selectMessages } from "../../containers/Message/selectors";
import { fetchAllMessages } from "../../containers/Message/actions";
import { fetchAllReportsOfUser } from "../../containers/ReportPage/actions";
import { selectReports } from "../../containers/ReportPage/selectors";

class SideBar extends Component {

  state = {
    top: 10,
    bottom: 10,
  }

  componentDidMount() {
    const {getProfile, user, fetchAllMessages} = this.props;
    if (user) {
      getProfile(user.id);
    }
    if (user.role === 'member' || user.role === 'team_leader') {
      fetchAllMessages(user.id);
    }
  }

  logout = (e) => {
    const {history} = this.props;
    e.preventDefault();
    this.props.logout();
    history.push('/');
  }

  render() {
    const {profile, loading, user, messages} = this.props;
    const avatar = profile ? profile.avatar : imageProfile;
    return (
      <div>
        <Affix offsetTop={this.state.top}>
          {loading && isEmpty(profile) && isEmpty(user) ? (
            <Spinner style={{fontSize: 32, color: '#071820'}}/>
          ) : (
            <ListGroup flush className="shadow-sm border-0">
              <ListGroupItem className="justify-content-between text-center">
                {loading && isEmpty(avatar) ? (
                  <Spinner/>
                ) : (
                  <CardImg src={avatar} alt="Card image cap"/>
                )}
                <CardBody>
                  <CardTitle>{profile.firstName} {profile.lastName}</CardTitle>
                  <CardText>
                    <small className="text-muted">
                      <Link to="/profile/edit">
                        <Icon type="profile" className="mr-1"/>
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
                      <Icon type="form" className="mr-2"/>
                      Write Daily Report
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem
                    className="justify-content-between"
                    action
                  >
                    <Link to="/report">
                      <Icon type="book" className="mr-2"/>
                      Reports
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem
                    className="justify-content-between"
                    action
                  >
                    <Link to="/message">
                      <Icon type="inbox" className="mr-2"/>
                      Messenger
                      {messages.length > 0 &&
                      (
                        <Badge color="warning">{messages.length}</Badge>
                      )
                      }
                    </Link>
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
                      <Icon className="mr-2" type="area-chart"/>
                      Statistics
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem
                    className="justify-content-between"
                    action
                  >
                    <Link to="/member">
                      <Icon className="mr-2" type="team"/>
                      Members List
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem
                    className="justify-content-between"
                    action
                  >
                    <Link to="/report">
                      <Icon className="mr-2" type="solution"/>
                      Reports of Team
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem
                    className="justify-content-between"
                    action
                  >
                    <Link to="/message">
                      <Icon type="inbox" className="mr-2"/>
                      Messenger
                      {messages.length > 0 &&
                      (
                        <Badge color="warning">{messages.length}</Badge>
                      )
                      }
                    </Link>
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
                    <Link to="/team">
                      <Icon type="idcard" className="mr-2"/>
                      Teams List
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem
                    className="justify-content-between"
                    action
                  >
                    <Link to="/member">
                      <Icon className="mr-2" type="team"/>
                      Members List
                    </Link>
                  </ListGroupItem>
                </Fragment>
              )
              }

              <ListGroupItem tag="a" className="justify-content-between" action>
                <Button
                  color="link"
                  className="p-0"
                  size="sm"
                  onClick={this.logout}
                >
                  <Icon type="logout" className="mr-2"/>
                  Logout
                </Button>
              </ListGroupItem>
            </ListGroup>
          )}
        </Affix>
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
  loading: selectProfileLoading(state),
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
