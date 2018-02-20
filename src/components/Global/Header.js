// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// Assets
import logo from '../../public/images/logo-NMP.png';
import '../../public/css/auditoria.css'

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };

  render() {
    const { title, items } = this.props;

    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top" role="navigation">
          <div className="navbar-header">
            <a className="navbar-brand" href="index.html"><img src={logo} /></a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                Nombre de usuario  <i className="fa fa-caret-down"></i>
              </a>
            </li>

          </ul>

          <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
              <ul className="nav" id="side-menu">


                {
                  items && items.map(
                    (item, key) =>
                      <li key={key}>
                        <Link to={item.url}>
                          <i className="fa fa-dashboard fa-fw"></i> {item.title}
                          <span className="fa arrow"></span>
                        </Link>
                      </li>
                  )
                }
              </ul>
            </div>
          </div>

          <div className="downbar">
            <div className="downbar-text">
              <h3><b>{title}</b></h3>
            </div>

          </div>
        </nav>

      </div>
    );
  }
}

export default Header;
