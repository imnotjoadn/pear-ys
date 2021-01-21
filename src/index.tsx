import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import theme from './theme';
import configureStore from './redux/store';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { firebaseConfig, rrfConfig } from './constants/config';

// Initialize Firebase instance
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {
  firebase: { authError: null },
};
const store = configureStore(initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};


ReactDOM.render(
  <React.StrictMode>
     <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <App />
            </Provider>
          </ThemeProvider>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
