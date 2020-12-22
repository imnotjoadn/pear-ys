import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';

import * as routes from './constants/routes';

import { Create } from './components/create/Create';

function App() {
  return (
    <Switch>
      <Route exact path={routes.HOME} component={Create} />
      <Route>404</Route>
    </Switch>
  );
}

export default App;
