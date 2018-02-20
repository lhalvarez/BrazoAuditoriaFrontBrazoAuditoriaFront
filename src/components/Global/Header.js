// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Assets
import logoNMP from '../../public/images/logo-NMP.png';
import '../../public/css/auditoria.css'

class Header extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render(){
    const { items } = this.props;

    return (
      <div>
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><img src={logoNMP} alt="" /></Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    Nombre de usuario  <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-user">
                    <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                    </li>
                    <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                    </li>
                    <li className="divider"></li>
                    <li><a href="#"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
    );
  }
}

export default Header;
