import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'popper.js/dist/popper.min';
import 'react-transition-group/dist/react-transition-group';
import './App.scss';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import VideoPlayerList from './components/videoList/VideoPlayerListComponent';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route path="/"  component={App}></Route>
        <Route path="/admin" component={VideoPlayerList}></Route>
        <Route path="/user" component={VideoPlayerList}></Route>
      </Fragment>
    </Router>
  </Provider>, 
  document.getElementById('root'));

