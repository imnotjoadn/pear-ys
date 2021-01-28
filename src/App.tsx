import './App.css';
import { Route, Switch } from 'react-router';

import * as routes from './constants/routes';

import Create from './components/create/Create';
import SignIn from './components/signin/SignIn';
import Comparison from './components/comparison/Comparison';
import Comparisons from './components/comparisons/Comparisons';

function App() {
  return (    
    <Switch>
      <Route exact path={routes.HOME} component={Create} />
      <Route exact path={routes.CREATE} component={Create} />
      <Route exact path={routes.COMPARISONS} component={Comparisons} />
      <Route exact path={routes.COMPARISON} component={Comparison} />
      <Route exact path={routes.SIGNIN} component={SignIn} />
      <Route>404</Route>
    </Switch>
  );
}

export default App;
