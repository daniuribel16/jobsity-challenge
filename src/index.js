import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'popper.js/dist/popper.min';
import 'react-transition-group/dist/react-transition-group';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import App from './App';
import VideoPlayerList from './components/videoList/VideoPlayerListComponent';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Fragment>
        <Route path="/"  component={App}></Route>
        <Route path="/admin" component={VideoPlayerList}></Route>
        <Route path="/user" component={VideoPlayerList}></Route>
      </Fragment>
    </HashRouter>
  </Provider>, 
  document.getElementById('root'));

