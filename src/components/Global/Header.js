// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserAvatar from 'react-user-avatar';

import { store } from '../../store';
import { cerrarSesion } from '../Session/actions';

// Assets
import logoNMP from '../../public/images/logo-NMP.png';
import '../../public/css/auditoria.css'

class Header extends Component {
  static propTypes = {
  };

  constructor(){
    super();

    this.logout = this.logout.bind(this);
    this.handleStoreChanges = this.handleStoreChanges.bind(this);

    this.state = { usuario: '' };

    this.unsuscribe = store.subscribe(this.handleStoreChanges);
  }

  logout(e){
    e.preventDefault();
    this.props.cerrarSesion();
  }

  handleStoreChanges(){
    if(store.getState().session.activeSession)
      this.setState({ usuario: store.getState().session.detalleUsuario.nombreCompleto });
  }

  componentWillUnmount(){
    this.unsuscribe();
  }

  render(){
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
                {this.state.usuario} <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-user">
                    <li><a href="#"><i className="fa fa-user fa-fw"></i> Perfil de Usuario</a>
                    </li>
                    <li><a href="#"><i className="fa fa-gear fa-fw"></i> Configuraciones</a>
                    </li>
                    <li className="divider"></li>
                    <li><a href="#" onClick={this.logout}><i className="fa fa-sign-out fa-fw"></i> Cerrar Sesión</a>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){

  return {
  }

}

export default connect(mapStateToProps,{cerrarSesion})(Header);
