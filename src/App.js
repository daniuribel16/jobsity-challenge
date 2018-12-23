import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.scss';

class App extends Component {

  constructor (props) {
    super(props)
    this.props.history.listen(() => this.checkPath());
  }

  state = {
    showWelcomePage: true
  }

  componentWillMount = () => this.checkPath();

  checkPath = () => {
    this.setState({ showWelcomePage: window.location.hash === '#/' });
  }

  render() {
    const wPage = this.state.showWelcomePage ?  (
      <div className="btn-welcome-container">
        <div className="btn-welcome-center">
          <Link to='/admin' className="btn btn-admin">Admin</Link>
          <Link to='/user' className="btn btn-user">User</Link>
        </div>
      </div>) : null;

    const menu = !this.state.showWelcomePage ?  (
      <div className="menu-container">
          <Link to={{ pathname: '/admin', state: 'admin' }} className="btn item-menu">Admin</Link>
          <Link to={{ pathname: '/user', state: 'user' }} className="btn item-menu">User</Link>
          <div className="menu-icon-container">
            <i class="fa fa-bars menu-icon"></i>
          </div>
      </div>) : null;

    return (
      <Fragment>
        {menu}
        {wPage}
      </Fragment>);
  }
}

export default withRouter(App);
