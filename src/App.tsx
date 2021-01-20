import './App.css';
import React, { useEffect } from "react";
import { Route, Switch } from 'react-router';
import { connect, ConnectedProps } from 'react-redux';

import * as routes from './constants/routes';

import Create from './components/create/Create';
import SignIn from './components/signin/SignIn';
import { RootState } from './redux/reducers';
import { FirebaseUser } from './services/firebase';


function App() {
  return (    
    <Switch>
      <Route exact path={routes.HOME} component={Create} />
      <Route exact path={routes.SIGNIN} component={SignIn} />
      <Route>404</Route>
    </Switch>
  );
}

export default App;
