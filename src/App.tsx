import './App.css';
import { Redirect, Route, Switch, RouteProps } from 'react-router';

import * as routes from './constants/routes';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers';

import Create from './components/create/Create';
import SignIn from './components/signin/SignIn';
import Home from './components/home/Home';
import Comparison from './components/comparison/Comparison';
import Comparisons from './components/comparisons/Comparisons';
import AppBar from './components/app_bar/AppBar';
import React from 'react';
import { FirebaseReducer, isEmpty, isLoaded } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core';

// https://stackoverflow.com/questions/62554778/private-route-in-react-redux-firebase-not-working
// https://github.com/prescottprue/react-redux-firebase/blob/master/docs/recipes/auth.md

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: theme.palette.background.default
  },
  main: {
    padding: "4px"
  },
}))

function PrivateRoute ({ children, ...rest }: RouteProps) {
  const auth = useSelector<RootState, FirebaseReducer.AuthState>(state => state.firebase.auth)
  // https://github.com/prescottprue/react-redux-firebase/issues/344
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
  const classes = useStyles();
  const auth = useSelector<RootState>(state => state.firebase.auth);

  if (!isLoaded(auth)) {
    return <div>Loading...</div>
  }

  return (
    <React.Fragment>
      <AppBar />
      <div className={classes.main}>        
        <Switch>
          <PrivateRoute path={routes.CREATE}>
            <Create />
          </PrivateRoute>
          <PrivateRoute path={routes.COMPARISON}>
            <Comparison />
          </PrivateRoute>
          <PrivateRoute path={routes.COMPARISONS}>
            <Comparisons />
          </PrivateRoute>
          <Route exact path={routes.SIGNIN} component={SignIn} />        
          <Route exact path={routes.HOME} component={Home} />
          <Route>404</Route>
        </Switch>
      </div>      
    </React.Fragment>
  );
}

export default App;
