import React, { Component } from 'react';
import Detalle from '../../components/Auditoria/Fotografia/Informacion/Detalle/index';

class DetallePartidaFotografia extends Component {
  render () {
    {
      return (

          <div>
            <Detalle idPartida={this.props.computedMatch.params.idPartida} idAuditoria={this.props.computedMatch.params.idAuditoria} />
          </div>
      )
    }
  }
}


export default DetallePartidaFotografia;
