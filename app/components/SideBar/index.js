import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ListGroup,
  ListGroupItem,
  CardBody,
  CardTitle,
  CardText,
  CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom'
import imageProfile from '../../assests/images/Gabe_newell.png';
import { selectUser } from "../../containers/Auth/selectors";


class SideBar extends Component {
  render() {
    const { user } = this.props;
    const avatar = user.avatar ? user.avatar : imageProfile;
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
        <ListGroupItem tag="a" className="justify-content-between" action>
          <FontAwesomeIcon icon="sign-out-alt" className="mr-2"/>
          Logout
        </ListGroupItem>
      </ListGroup>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectUser(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);

