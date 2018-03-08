import React, { Component } from 'react';
import Auditoria from '../../components/Auditoria/Fotografia/Informacion/Partidas/index';
import  { Redirect } from 'react-router-dom'

class DetalleAuditoriaFotografia extends Component {
    render () {
        const nombreArchivo = this.props.location.query && this.props.location.query.nombreArchivo;
        {
            return (
                nombreArchivo ?
                    <div>
                        <Auditoria idAuditoria={this.props.computedMatch.params.idAuditoria}
                                   nombreArchivo={nombreArchivo}/>
                    </div> : <Redirect to="/"/>
            )
        }
    }
}

export default DetalleAuditoriaFotografia;
