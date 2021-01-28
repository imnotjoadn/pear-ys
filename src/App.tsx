import './App.css';
import { Redirect, Route, Switch, RouteProps } from 'react-router';

import * as routes from './constants/routes';
import { useSelector} from 'react-redux';
import { RootState } from './redux/reducers';

import Create from './components/create/Create';
import SignIn from './components/signin/SignIn';
import Comparison from './components/comparison/Comparison';
import Comparisons from './components/comparisons/Comparisons';
import AppBar from './components/app_bar/AppBar';
import React from 'react';
import { isEmpty, isLoaded } from 'react-redux-firebase';

function PrivateRoute({ children, ...rest }: RouteProps) {
  const auth = useSelector<RootState>(state => state.firebase.auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.SIGNIN,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <React.Fragment>      
      <AppBar />
      <Switch>
        <PrivateRoute exact path={routes.HOME} component={Create} />
        <PrivateRoute exact path={routes.CREATE} component={Create} />
        <PrivateRoute exact path={routes.COMPARISONS} component={Comparisons} />
        <PrivateRoute exact path={routes.COMPARISON} component={Comparison} />
        <Route exact path={routes.SIGNIN} component={SignIn} />
        <Route>404</Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
