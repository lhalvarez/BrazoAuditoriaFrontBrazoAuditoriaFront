// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../../../store';
import ContainerTitle from '../../../Global/ContainerTitle';
import { TITLES } from '../../../../constants';
import FormularioBusquedaPartida from './FormularioBusquedaPartida';
import DetallePartidaCajaAbierta from './DetallePartida';
import {CAMPOS} from '../../../../data/fakeSelectsParametrizables';
import { obtenerDetallePartida } from './actions';

class AuditoriaFisicaCajaCerrada extends Component{
  static propTypes = {

  };

  constructor(){
    super();

    this.state = {
      title: TITLES.AUDITORIA.FISICA.CAJA_CERRADA.BUSQUEDA_PARTIDA,
      loadDetail: false
    };

    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.unsuscribe = store.subscribe(this.handleStoreChange);
  }

  handleStoreChange(){
    if(store.getState().cajaAbierta.loadDetail){
      this.setState({
        title: TITLES.AUDITORIA.FISICA.CAJA_CERRADA.DETALLE_PARTIDA,
        loadDetail: store.getState().cajaAbierta.loadDetail
      });
    }
  }

  componentWillUnmount(){
    this.unsuscribe();
  }

  render(){
    const { title, loadDetail } = this.state;

    return (
      <div>
        <ContainerTitle title={title} />
        <FormularioBusquedaPartida obtenerDetallePartida={this.props.obtenerDetallePartida} />
        { loadDetail && <DetallePartidaCajaAbierta campos={CAMPOS} /> }
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps, {obtenerDetallePartida} )(AuditoriaFisicaCajaCerrada);

