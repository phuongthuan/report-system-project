import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
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


class SideBar extends Component {

  logout = (e) => {
    const {history} = this.props;
    e.preventDefault();
    this.props.logout();
    history.push('/');
  }

  render() {
    const {user} = this.props;
    const avatar = user ? user.avatar : imageProfile;
    return (
      <ListGroup className="shadow-sm">
        <ListGroupItem className="justify-content-between text-center">
          <CardImg src={avatar} alt="Card image cap"/>
          <CardBody>
            <CardTitle>{user.firstName} {user.lastName}</CardTitle>
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


        {(user.role) === 'member' &&
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

        {(user.role) === 'team_leader' &&
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

        {(user.role) === 'group_leader' &&
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
    );
  }
}

SideBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AuthPageActions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
