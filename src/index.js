// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Bluebird from 'bluebird';
import reducers from './reducers';
import thunk from 'redux-thunk'


// Routes
import AppRoutes from './routes';

// Assets




// Bluebird configuration
window.Promise = Bluebird;

Bluebird.config({ warnings: false });
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

window.addEventListener('unhandledrejection', error => {
  error.preventDefault();

  if (process.env.NODE_ENV !== 'production') {
    console.warn('Unhandled promise rejection warning.', error.detail);
  }
});

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
 ,
  document.getElementById('root')
);
