import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'duckbase';
import FireBaseUserReducer from './firebaseUserReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  currentUser: FireBaseUserReducer,
  firebase: firebaseReducer,
  modal: modalReducer,
  router: routerReducer
});

export default rootReducer;
