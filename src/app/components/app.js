import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'duckbase';
import AppRoutes from '../routes';
import Loading from '../components/helpers/loading';
import { logoutUser } from '../actions/firebaseUserActions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import RestaurantMenuIcon from 'material-ui/svg-icons/maps/restaurant-menu';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AccountIcon from 'material-ui/svg-icons/action/account-box';
import * as Colors from '../constants/colors';
import * as AccountUtils from '../utils/accountUtils';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  renderUserMenu(currentUser) {
    if (!currentUser || !currentUser.uid) {
      return (
        <div className='login-register'>
          <li key={1}><Link to='/login'>Login</Link></li>
          <li key={2}><Link to='/signup'>Sign Up</Link></li>
        </div>
      );
    }

    return (
      <div className='userDropdownMenu'>
        <span>{currentUser.email}</span>
        <IconMenu
          iconButtonElement={<IconButton><ExpandMoreIcon color={'white'} /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <Link to='/profile'><MenuItem>Profile</MenuItem></Link>
          <Link to='/logout' onClick={this.props.logoutUser}><MenuItem>Logout</MenuItem></Link>
        </IconMenu>
      </div>
    );
  }

  handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  getAppDrawer = () => {
    return (
      <div>
        <IconButton
          label='Open Drawer'
          onTouchTap={this.handleDrawerToggle}>
          <RestaurantMenuIcon color={Colors.WHITE} />
        </IconButton>
        <Drawer
          docked={false}
          open={this.state.drawerOpen}
          onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}>
          <Link to='/recipes'><MenuItem onTouchTap={() => this.handleDrawerToggle()}><RestaurantMenuIcon />Recipes</MenuItem></Link>
          <Link to='/account'><MenuItem onTouchTap={() => this.handleDrawerToggle()}><AccountIcon />Account</MenuItem></Link>
        </Drawer>
      </div>
    );
  }

  getAppHeader() {
    const headerProps = {
      className: 'mainHeader',
      iconElementRight: this.renderUserMenu(this.props.currentUser),
      iconElementLeft: this.getAppDrawer(),
      title: <Link to='/'>Mead & Read</Link>
    };
    return <AppBar {...headerProps} />;
  }

  render() {
    return (
      <div className='app'>
        {this.getAppHeader()}
        <div className='appContentContainer'>
          {this.props.isLoading ? <Loading /> : <AppRoutes />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  const userId = currentUser && currentUser.uid;
  const accountId = AccountUtils.getAccountId(state);

  return {
    currentUser: state.currentUser,
    isLoading: !!userId && !accountId,
    userId
  };
};

const mapDispatchToProps = { logoutUser };

const mapPropsToPaths = (props) => props.userId ? [`/users/${props.userId}`] : [];

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(mapPropsToPaths)
)(App);
