import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import rootReducer from './reducers';
import DevTools from './containers/DevTools';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(history, initialState) {
  const enhancer = compose(
    applyMiddleware(reduxThunk, reduxPromise, routerMiddleware(history)),
    DevTools.instrument()
  );

  return createStore(rootReducer, initialState, enhancer);
}
