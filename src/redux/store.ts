import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';

function configureStore(initialState = {}) {
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  if (window && window.location && window.location.hostname === 'localhost') {
    // eslint-disable-next-line no-underscore-dangle
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware: any[] = [
    // This is where you add other middleware like redux-observable
  ];

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers),
  );

  // store.asyncReducers = {};

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default; // eslint-disable-line global-require
  //     store.replaceReducer(reducers(store.asyncReducers));
  //   });
  // }

  return store;
}

export default configureStore;