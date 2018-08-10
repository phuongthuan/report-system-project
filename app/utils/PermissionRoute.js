import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectIsAuthenticated, selectUser } from "../containers/Auth/selectors";
import NoPermision from "./NoPermission";

const PermissionRoute = ({component: Component, user, role, ...rest}) => {
  return (
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
}

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  null
)(PermissionRoute);