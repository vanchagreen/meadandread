import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatButton, Paper, RaisedButton, TextField } from 'material-ui';
import { loginUser, loginWithProvider, registerUser } from '../../actions/firebaseUserActions';

import './login.scss';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: true,
      message: '',
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const email = this.refs.email.input.value;
    const password = this.refs.password.input.value;
    if (this.state.isLoggingIn) {
      this.props.loginUser({ email, password }).then((data) => {
        if (data.payload.errorCode) {
          this.setState({ message: data.payload.errorMessage });
        } else {
          this.props.history.push('/');
        }
      });
    } else {
      this.props.registerUser({ email, password }).then((data) => {
        if (data.payload.errorCode) {
          this.setState({ message: data.payload.errorMessage });
        } else {
          this.props.history.push('/');
        }
      });
    }
  }

  loginWithProvider = (provider) => {
    this.props.loginWithProvider(provider).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div className='loginForm'>
        <Paper>
          <h2>{this.state.isLoggingIn ? 'Login' : 'Sign Up'}</h2>
          <TextField type='email' id='txtEmail' ref='email' hintText='Email' name='email' />
          <div className='form-group'>
            <TextField type='password' id='txtPass' ref='password' hintText='Password' name='password' />
          </div>
          <div>{this.state.message}</div>
          <RaisedButton type='submit' onTouchTap={this.onFormSubmit}>{this.state.isLoggingIn ? 'Login' : 'Sign Up'}</RaisedButton>
          <br />
          {this.state.isLoggingIn && <div>{/*<h5><Link to='/reset'>Forgot password?</Link></h5>*/}
            <FlatButton onTouchTap={() => this.setState({ isLoggingIn: false })}>Sign Up</FlatButton></div>}
        </Paper>

        <Paper>
          <h2>{this.state.isLoggingIn ? 'Login' : 'Sign Up'} with</h2>
          <RaisedButton className='btn btn-google' backgroundColor={'#DD4B39'}
            onClick={() => this.loginWithProvider('google')} data-provider='google'>
            <i className='fa fa-google' /> Google</RaisedButton>
        </Paper>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser,
    loginWithProvider,
    registerUser
  }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLogin));
