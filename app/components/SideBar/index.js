import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
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

class SideBar extends Component {

  componentDidMount() {
    const {getProfile, user} = this.props;
    getProfile(user.id);
  }

  logout = (e) => {
    const {history} = this.props;
    e.preventDefault();
    this.props.logout();
    history.push('/');
  }

  render() {
    const {profile, loading} = this.props;
    const avatar = profile ? profile.avatar : imageProfile;
    return (
      <div>
        {loading && isEmpty(profile) ? (
          <FontAwesomeIcon icon="spinner" size="lg" spin/>
        ) : (
          <ListGroup className="shadow-sm">
            <ListGroupItem className="justify-content-between text-center">
              <CardImg src={avatar} alt="Card image cap"/>
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
                    Reports
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
                    <FontAwesomeIcon icon="chart-area" className="mr-2"/>
                    Statistics
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/statistic/members">
                    <FontAwesomeIcon icon="address-card" className="mr-2"/>
                    Members List
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
                  <Link to="/statistic/teams">
                    <FontAwesomeIcon icon="list-alt" className="mr-2"/>
                    Teams List
                  </Link>
                </ListGroupItem>

                <ListGroupItem
                  className="justify-content-between"
                  action
                >
                  <Link to="/statistic/members">
                    <FontAwesomeIcon icon="address-card" className="mr-2"/>
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
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getProfile: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  profile: selectProfile(state),
  user: selectUser(state),
  loading: selectLoading(state)
});

const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(ProfilePageActions.getUserProfile(id)),
  logout: () => dispatch(AuthPageActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
