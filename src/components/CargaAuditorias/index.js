import React, { Component } from 'react';
import {getDocs,saveDoc,saveAuditoria,getDoc,deleteDoc} from './actions';
import {connect} from 'react-redux';
import { store } from '../../store';
import {AUDITORIAS} from '../../data/fakeAuditorias';




import SeccionCargarArchivos from './SeccionCargarArchivo';
import SeccionTabla from './tabla';

class CargarAuditorias extends React.Component {

  constructor(props) {
    super(props);

    this.switchView = this.switchView.bind(this);

    this.state = {
      detalleUsuario: store.getState().session.detalleUsuario,
      isReceiverOpen: false

    };
    this.tipoAuditoria = 0;
  }

  switchView(){
    if(this.props.path === '/cargar-partidas-fotografia') this.tipoAuditoria = 1;
    if(this.props.path === '/cargar-partidas-fisica') this.tipoAuditoria = 2;
  }





  render() {
    this.switchView();
    return (
      <div>
        <SeccionCargarArchivos
          path={this.props.path}
          detalleUsuario={this.state.detalleUsuario}
          tipoAuditoria={this.tipoAuditoria}
          saveDoc={this.props.saveDoc}
          saveAuditoria={this.props.saveAuditoria}
        />

        <SeccionTabla
        auditorias={AUDITORIAS}
        detalleUsuario={this.state.detalleUsuario}
        tipoAuditoria={this.tipoAuditoria}
        getDoc={this.props.getDoc}
        deleteDoc={this.props.deleteDoc}
        />

      </div>
    );
  }

}

function mapStateToProps(state){

  return {

  }

}
export default connect(mapStateToProps,{saveDoc,saveAuditoria,getDoc,deleteDoc})(CargarAuditorias);
