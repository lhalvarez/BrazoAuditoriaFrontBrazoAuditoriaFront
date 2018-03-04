import React, { Component } from 'react';
import Auditoria from '../../components/Auditoria/Fotografia/Informacion/Partidas/index';

class DetalleAuditoriaFotografia extends Component {
    render () {
        const nombreArchivo = this.props.location.query ? this.props.location.query.nombreArchivo : 'Desconocido';
        return (
            <div>
                <Auditoria idAuditoria={this.props.computedMatch.params.idAuditoria}
                           nombreArchivo={nombreArchivo} />
            </div>
        );
    }
}

export default DetalleAuditoriaFotografia;
