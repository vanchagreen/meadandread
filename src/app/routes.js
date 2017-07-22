import React from 'react';
import { Route } from 'react-router-dom';
import { AuthedRoute } from './utils/auth';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import HomeIndex from './components/indexHome';
import ClubInfo from './containers/clubInfoContainer';
import UserLogin from './components/user/login';
import Profile from './components/user/profile';

const AppRoutes = () => (
  <div>
    <AuthedRoute exact path='/' component={HomeIndex}/>
    <AuthedRoute path='/club/:clubId' component={ClubInfo}/>
    <Route path='/login' component={UserLogin} />
    <AuthedRoute path='/profile' component={Profile}/>
  </div>
);

export default DragDropContext(HTML5Backend)(AppRoutes);
