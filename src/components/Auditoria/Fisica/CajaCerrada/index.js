// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../../../store';
import ContainerTitle from '../../../Global/ContainerTitle';
import { TITLES } from '../../../../constants';
import FormularioBusquedaPartida from './FormularioBusquedaPartida';
import DetallePartidaCajaCerrada from './DetallePartida';
import {CAMPOS} from '../../../../data/fakeSelectsParametrizables';
import { obtenerDetallePartida ,newTest} from './actions';

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
    this.showDetail = this.showDetail.bind(this);
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

  showDetail(){
    if(!this.state.loadDetail){
      return <DetallePartidaCajaCerrada campos={CAMPOS} />;
    }
    return <div> </div>
  }

  componentDidMount(){
    this.props.newTest(123456790);

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
        <this.showDetail />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps, {obtenerDetallePartida,newTest} )(AuditoriaFisicaCajaCerrada);

