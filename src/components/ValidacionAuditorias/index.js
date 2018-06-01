import React, { Component } from 'react';
import { getAuditorias, getAuditoriasFisica, saveAuditoria, sendNotification } from './actions'
import { connect } from 'react-redux';
import { store } from '../../store';
import Pagination from 'rc-pagination';
import ContainerTitle from '../Global/ContainerTitle';

import TablasValidacion from './TablasValidacion';
import { AUDITORIAS } from './cargaAuditoriaFake';
import { TIPOS_VALIDACION } from '../../constants';


class ValidacionAuditorias extends React.Component {

    constructor(props) {
        super(props);

        this.onChangePagination = this.onChangePagination.bind(this);
        this.auditoriasFisicas = this.auditoriasFisicas.bind(this);
        this.auditoriasFotograficas = this.auditoriasFotograficas.bind(this);

        this.state = {
            detalleUsuario: store.getState().session.detalleUsuario,
            page: 0,
            pageSize: 10,
            total: 0,
            idAuditoriaPhoto: 1,
            auditoriasPendientes: [],
            auditoriasPendientesCaja: [],
            totalACaja: 0
        };
        this.tipoValidacion = 0;
    }

    componentDidMount() {

        this.auditoriasFisicas();
        this.auditoriasFotograficas();

    }

    auditoriasFisicas = () => {
        //console.log("SI ENTROOOOOOOOOOOOOOOOOOOOO");
        let aFisica = [];

        aFisica: this.props.getAuditoriasFisica(0, this.state.page, this.state.pageSize);
        console.log(aFisica, "ESTO TIENE LA AFISICA");
        this.setState({
            auditoriasPendientesCaja: aFisica.length < 0 ? new Array() : aFisica
        })
    }

    auditoriasFotograficas = () => {
        //console.log("SI ENTROOOOOOOOOOOOOOOOOOOOO");
        let auditoriaObtenida = [];
        auditoriaObtenida: this.props.getAuditorias(1, this.state.page, this.state.pageSize);
        this.setState({
            auditoriasPendientes: auditoriaObtenida.length < 0 ? new Array() : auditoriaObtenida
        })

    }

    onChangePagination = (page, pageSize) => {
        this.setState({
            page: page - 1
        }, this.props.getAuditorias(page - 1, this.state.pageSize));
    };


    render() {
        //console.log("esto tienen las auditorias", this.props.auditoriasPendientes)
        const usuario = this.state.detalleUsuario.usuario;

        switch (this.props.path) {

            case '/validacion-partidas-fotografia':
                this.tipoValidacion = TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA;
                return (
                    <div>
                        <ContainerTitle title={'Validación de Auditoría por Fotografía'} />
                        <TablasValidacion
                            tipoValidacion={this.tipoValidacion}
                            usuario={usuario}
                            auditoriasPendientes={this.props.auditoriasPendientes}
                            saveAuditoria={this.props.saveAuditoria}
                            sendNotification={this.props.sendNotification}
                            getAuditorias={this.props.getAuditorias}
                            getAuditoriasFisica={this.props.getAuditoriasFisica}
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
                        <ContainerTitle title={'Validación de Auditoría Fisica'} />
                        <TablasValidacion
                            tipoValidacion={this.tipoValidacion}
                            auditorias={AUDITORIAS}
                            usuario={usuario}
                            auditoriaFisica={this.props.auditoriasPendientesCaja}
                            saveAuditoria={this.props.saveAuditoria}
                            sendNotification={this.props.sendNotification}
                            getAuditoriasFisica={this.props.getAuditoriasFisica}
                            getAuditorias={this.props.getAuditorias}
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
        auditoriasPendientes: state.validacionAuditora.auditoriasPendientes,
        auditoriasPendientesCaja: state.validacionAuditora.auditoriasPendientesCaja,
        total: state.validacionAuditora.total,
        totalACaja: state.validacionAuditora.totalACaja
    }
}

export default connect(mapStateToProps, { getAuditorias, saveAuditoria, getAuditoriasFisica, sendNotification })(ValidacionAuditorias);
