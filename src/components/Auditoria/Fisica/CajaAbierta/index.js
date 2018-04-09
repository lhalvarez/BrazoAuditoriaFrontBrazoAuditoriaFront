// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { store } from '../../../../store';
import ContainerTitle from '../../../Global/ContainerTitle';
import { TITLES } from '../../../../constants';
import FormularioBusquedaPartida from './FormularioBusquedaPartida';
import DetallePartidaCajaAbierta from './DetallePartida';

class AuditoriaFisicaCajaAbierta extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.state = {
  			title: TITLES.AUDITORIA.FISICA.CAJA_ABIERTA.BUSQUEDA_PARTIDA
  		};

  		this.handleStoreChange = this.handleStoreChange.bind(this);

  		this.unsuscribe = store.subscribe(this.handleStoreChange);
  	}

  	handleStoreChange(){
  		if(store.getState().cajaAbierta.partidaCargada){
  			this.setState({
  				title: `${TITLES.AUDITORIA.FISICA.CAJA_ABIERTA.DETALLE_PARTIDA} ${store.getState().cajaAbierta.llavePartida.rfid}`
  			});
  		}
      else
        this.setState({ title: TITLES.AUDITORIA.FISICA.CAJA_ABIERTA.BUSQUEDA_PARTIDA });
  	}

  	componentWillUnmount(){
  		this.unsuscribe();
  	}

  	render(){
  		const { title } = this.state;

  		return (
  			<div>
  				<ContainerTitle title={title} />
  				<FormularioBusquedaPartida />
  				<DetallePartidaCajaAbierta />
  			</div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(AuditoriaFisicaCajaAbierta);