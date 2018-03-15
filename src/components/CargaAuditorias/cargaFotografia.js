import React, { Component } from 'react';
import SeccionCargarArchivos from './SeccionCargarArchivo';
import SeccionTabla from './tabla';

class CargaFotografia extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render  () {
    return(
      <div>
      <SeccionCargarArchivos
        path={this.props.path}
        detalleUsuario={this.props.detalleUsuario}
        tipoAuditoria={this.props.tipoAuditoria}
        saveDoc={this.props.saveDoc}
        saveAuditoria={this.props.saveAuditoria}
        sendNotification={this.props.sendNotification}
      />

      <SeccionTabla
        auditorias={this.props.auditorias}
        detalleUsuario={this.props.detalleUsuario}
        tipoAuditoria={this.props.tipoAuditoria}
        getDoc={this.props.getDoc}
        deleteDoc={this.props.deleteDoc}
        />
      </div>
    );
  }

}

export default CargaFotografia;
