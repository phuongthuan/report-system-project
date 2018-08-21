import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectIsAuthenticated, selectUser } from "../containers/Auth/selectors";
import NoPermision from "./NoPermission";

const PermissionRoute = ({component: Component, user, role, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      (user.role === role || user.role === role[0] || user.role === role[1] || user.role === role[2]) ? (
        <Component {...props} />
      ) : (
        <NoPermision location={props.location}/>
      )
    }
  />
);

PermissionRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  null
)(PermissionRoute);