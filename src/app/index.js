import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FirebaseProvider } from 'duckbase';
import { ConnectedRouter } from 'react-router-redux';
import { createHashHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';
import DevTools from './containers/DevTools';
import configureStore from './configureStore';
import * as FirebaseUserActions from '../app/actions/firebaseUserActions';
import { firebaseApp } from './utils/firebaseUtils';

// for bundling your styles
import './bundle.scss';

const history = createHashHistory();
const store = configureStore(history);

// listen to user state change and wait for initial value
store.dispatch(FirebaseUserActions.listenToUser()).then(() => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <FirebaseProvider firebaseApp={firebaseApp}>
          <ConnectedRouter history={history}>
            <div>
              <App />
              <DevTools />
            </div>
          </ConnectedRouter>
        </FirebaseProvider>
      </Provider>
    </MuiThemeProvider>
    , document.getElementById('react-root'));
});
