// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Bluebird from 'bluebird';

import { store } from './store';
import reducers from './reducers';


// Routes
import AppRoutes from './routes';

// Assets


// Bluebird configuration
window.Promise = Bluebird;

Bluebird.config({ warnings: false });

window.addEventListener('unhandledrejection', error => {
  error.preventDefault();

  if (process.env.NODE_ENV !== 'production') {
    console.warn('Unhandled promise rejection warning.', error.detail);
  }
});

render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
 ,
  document.getElementById('root')
);
