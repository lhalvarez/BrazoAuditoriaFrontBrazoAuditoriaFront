/*
* Componente global encargado de inicializar la sesión del usuario
*/

// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { store } from '../../store';
import { redireccionarLogin, iniciarSesion } from './actions';

// Valores en hard code provisionales hasta que el servicio los regrese
var detalleUsuario = null;
var menu = null;
var token = '';

// Función provisional para generar un usuario diferente en cada sesión
/*function mockUser(){
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let text = '';

	for (var i = 0; i < 20; i++)
    	text += possible.charAt(Math.floor(Math.random() * possible.length));

  	return text;
}*/

class SessionInit extends Component{
	
	static propTypes = {

  	};

  	constructor(props){
  		super(props);

  		this.handleStoreChanges = this.handleStoreChanges.bind(this);

  		this.unsuscribe = store.subscribe(this.handleStoreChanges);
  		this.state = {};
  	}

  	handleStoreChanges(){
		if(store.getState().session.activeSession)
			this.setState({ activeSession: store.getState().session.activeSession });
  	}

  	componentWillUnmount(){
		this.unsuscribe();
  	}

	render(){
		if(!this.state.activeSession)
		{
			const { search } = this.props.location;

			/* Validación de datos provenientes del Login NMP */
	  		if(!(search && (/^.+code=.+$/.test(search))))
	  		{
				this.props.redireccionarLogin();
				return true;
	  		}

	  		/* Petición para iniciar la sesión */
			let codigoAutorizacion = /^.+code=(.*)$/.exec(search)[1].split('&')[0];
			this.props.iniciarSesion({
				codigoAutorizacion,
				detalleUsuario,
				menu,
				token
			});	
		}
		else
			window.location = '/';

		return <div></div>;
	}
}

function mapStateToProps(state){

  return {
    token: '',
    usuario: ''
  }

}

export default connect(mapStateToProps,{redireccionarLogin, iniciarSesion})(SessionInit);