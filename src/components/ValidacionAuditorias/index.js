import React, { Component } from 'react';
import { getAuditorias, saveAuditoria, sendNotification } from './actions'
import { connect } from 'react-redux';
import { store } from '../../store';
import Pagination from 'rc-pagination';

import TablasValidacion from './TablasValidacion';
import { AUDITORIAS } from './cargaAuditoriaFake';
import { TIPOS_VALIDACION } from '../../constants'


class ValidacionAuditorias extends React.Component {

    constructor(props) {
        super(props);

        this.onChangePagination = this.onChangePagination.bind(this);

        this.state = {
            detalleUsuario: store.getState().session.detalleUsuario,
            page: 0,
            pageSize: 10,
            total: 0,
        };
        this.tipoValidacion = 0;
    }

    onChangePagination = (page, pageSize) => {
        this.setState({
            page: page - 1
        }, this.props.getAuditorias(page - 1, this.state.pageSize));
    };


    render() {
        console.log(this.props.auditoriasPendientes)
        const usuario = this.state.detalleUsuario.usuario;
        switch (this.props.path) {

            case '/validacion-partidas-fotografia':
                this.tipoValidacion = TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA;
                return (
                    <div>
                        <TablasValidacion
                            tipoValidacion={this.tipoValidacion}
                            auditorias={AUDITORIAS}
                            auditoriasList={this.props.auditoriasPendientes}
                            saveAuditoria={this.props.saveAuditoria}
                            sendNotification={this.props.sendNotification}
                        />
                        <Pagination current={this.state.page + 1}
                            pageSize={this.state.pageSize}
                            hideOnSinglePage={true}
                            total={this.state.total}
                            onChange={this.onChangePagination} />
                    </div>
                );
            case '/validacion-partidas-fisica':
                this.tipoValidacion = TIPOS_VALIDACION.VALIDACION_FISICA;
                return (
                    <div>
                        <TablasValidacion
                            tipoValidacion={this.tipoValidacion}
                            auditorias={AUDITORIAS}
                            auditoriasList={this.props.auditoriasPendientes}
                            saveAuditoria={this.props.saveAuditoria}
                            sendNotification={this.props.sendNotification}
                        />
                        <Pagination current={this.state.page + 1}
                            pageSize={this.state.pageSize}
                            hideOnSinglePage={true}
                            total={this.state.total}
                            onChange={this.onChangePagination} />
                    </div>
                );
        }
    }


}

function mapStateToProps(state) {
    return {
        auditoriasPendientes: state.validacionAuditora.auditoriasPendientes
    }
}

export default connect(mapStateToProps, { getAuditorias, saveAuditoria, sendNotification })(ValidacionAuditorias);
