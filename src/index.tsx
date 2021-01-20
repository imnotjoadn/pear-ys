import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import * as firebase from 'firebase/app';

import theme from './theme';
import store from './redux/store';

const firebaseConfig = {
  apiKey: "AIzaSyDzbwCsZNmBPdsAIG-isIzOzoIrGbNhwPg",
  authDomain: "pearys-88fd5.firebaseapp.com",
  projectId: "pearys-88fd5",
  storageBucket: "pearys-88fd5.appspot.com",
  messagingSenderId: "435876797912",
  appId: "1:435876797912:web:407a0e054f7f35815666ad",
  measurementId: "G-K551F6JG2J"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

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
