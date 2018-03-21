import React, { Component } from 'react';
import Detalle from '../../components/Auditoria/Fotografia/Informacion/Detalle/index';
import  { Redirect } from 'react-router-dom';

class DetallePartidaFotografia extends Component {
  render () {
    const nombreArchivo = this.props.location.query && this.props.location.query.nombreArchivo;

    {
      return (

          <div>
            <Detalle idPartida={this.props.computedMatch.params.idPartida} />
          </div>
      )
    }
  }
}


export default DetallePartidaFotografia;
