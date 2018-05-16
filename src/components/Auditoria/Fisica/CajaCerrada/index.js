// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../../../store';
import ContainerTitle from '../../../Global/ContainerTitle';
import { TITLES } from '../../../../constants';
import FormularioBusquedaPartida from './FormularioBusquedaPartida';
import DetallePartidaCajaCerrada from './DetallePartida';
import {CAMPOS} from '../../../../data/fakeSelectsParametrizables';
import { obtenerDetallePartida ,flushdetallePartida,enviarResultado} from './actions';

class AuditoriaFisicaCajaCerrada extends Component{

  constructor(){
    super();

    this.state = {
      title: TITLES.AUDITORIA.FISICA.CAJA_CERRADA.BUSQUEDA_PARTIDA,
      loadDetail: false
    };

  }

  componentWillUnmount(){
    this.props.flushdetallePartida();
  }





  render(){
    const { title } = this.state;
    const {loadDetail} = this.props

    return (
      <div>
        <ContainerTitle title={title} />
        <FormularioBusquedaPartida obtenerDetallePartida={this.props.obtenerDetallePartida} />
        {loadDetail && <DetallePartidaCajaCerrada cajaCerrada={this.props.cajaCerrada} enviarResultado={this.props.enviarResultado}/>}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    cajaCerrada: state.cajaCerrada,
    loadDetail: state.cajaCerrada.loadDetail
  }
}

export default connect(mapStateToProps, {obtenerDetallePartida,flushdetallePartida,enviarResultado} )(AuditoriaFisicaCajaCerrada);
