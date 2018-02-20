// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Bluebird from 'bluebird';


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

    <Router>
      <AppRoutes />
    </Router>
 ,
  document.getElementById('root')
);
