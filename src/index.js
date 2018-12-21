import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'popper.js/dist/popper.min';
import 'react-transition-group/dist/react-transition-group';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

