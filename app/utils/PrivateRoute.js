import React from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectIsAuthenticated } from "../containers/Auth/selectors";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: props.location}
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state)
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);