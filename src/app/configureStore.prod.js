import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import rootReducer from './reducers';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(history, initialState) {
  const enhancer = applyMiddleware(reduxThunk, reduxPromise, routerMiddleware(history));
  return createStore(rootReducer, initialState, enhancer);
}
