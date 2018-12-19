import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/brand.png';

export default class Navbar extends Component {

    render = () => {
        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link to="billing" className="navbar-brand"><img src={logo} alt="brand" /></Link>
                </div>
            
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to="empty">Dashboard</Link></li>
                    <li><Link to="empty">Network</Link></li>
                    <li><Link to="empty">Network</Link></li>
                    <li><Link to="empty">Network</Link></li>
                    <li><Link to="empty">Network</Link></li>
                    <li><Link to="empty">Network</Link></li>
                    <li><Link to="billing">Billing</Link></li>
                    <li><Link to="empty">Network</Link></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                  
                    <li><Link to="empty"><i className="fas fa-search"></i></Link></li>
                    <li><Link to="empty"><i className="far fa-question-circle"></i></Link></li>
                    <li><Link to="empty"><i className="fas fa-bell black-icon"></i></Link>
                      <div className="bag-bell"></div>
                    </li>
                    <li className="dropdown">
                      <Link to="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span className="js-dropdown">JS</span> <span className="caret"></span>
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link to="empty">Settings</Link></li>
                        <li><Link to="empty">Help</Link></li>
                        <li role="separator" className="divider"></li>
                        <li><Link to="empty">Logout</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }

}