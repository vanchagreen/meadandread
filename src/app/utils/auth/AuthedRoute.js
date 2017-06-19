import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return { isAuthenticated: !!(state.currentUser && state.currentUser.uid) };
};

const AuthedRoute = (props) => {
  if (props.isAuthenticated) {
    return <Route {...props} />;
  }

  return <Redirect to={{
    pathname: '/login',
    state: { from: props.location }
  }} />;
};

export default withRouter(connect(mapStateToProps)(AuthedRoute));
