import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatButton } from 'material-ui';

import { updateUser, removeUser } from '../../actions/firebaseUserActions';
import Loading from '../helpers/loading';

class UserProfile extends Component {
  render() {
    if (!this.props.currentUser) {
      return <Loading />;
    }

    return (
      <div className='col-md-6'>
          <h2>Profile Page</h2>
          <div>{this.props.currentUser.email}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUser, removeUser }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
