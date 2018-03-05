/*
* Definición de rutas privadas para proteger la aplicación
*/

// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { store } from '../../store';
import { verificarSesion, verificarMenu, cerrarSesion } from '../Session/actions';
import { NUMERICAS, CONFIG } from '../../constants';

class PrivateRoute extends Component{

	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.handleStoreChanges = this.handleStoreChanges.bind(this);

  		this.unsuscribe = store.subscribe(this.handleStoreChanges);
  		this.state = {};
  	}

  	handleStoreChanges(){
  		if(store.getState().session.activeSession)
  		{
			this.setState({ activeSession: store.getState().session.activeSession });
			this.unsuscribe();
  		}
  	}

	componentWillMount(){
		this.props.verificarSesion();
		this.props.verificarMenu();
	}

	componentDidMount(){
		if(CONFIG.ENABLE_SESSION){		
			/* Verificar la sesión cada n segundos */
			setInterval(() => this.props.verificarSesion(),NUMERICAS.VERIFICAR_SESION);

			/* Cerrar la sesión después de n segundos */
			setTimeout(() => this.props.cerrarSesion(),NUMERICAS.CERRAR_SESION);
		}
	}

	componentWillUnmount(){
		this.unsuscribe();
  	}

	render(){
		/* Prevenir el intento de acceso sin sesión */
		if(!this.state.activeSession)
			return true;

		let { component:Component, ...rest } = this.props;

		return <Route {...rest} render={() => <Component {...this.props} />} />;
	}
}

function mapStateToProps(state){

  return {
  }

}

export default connect(mapStateToProps,{ verificarSesion, verificarMenu, cerrarSesion })(PrivateRoute);