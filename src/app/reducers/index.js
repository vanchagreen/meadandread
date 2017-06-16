import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'duckbase';
import FireBaseUserReducer from './firebaseUserReducer';

const rootReducer = combineReducers({
  currentUser: FireBaseUserReducer,
  firebase: firebaseReducer,
  router: routerReducer
});

export default rootReducer;
