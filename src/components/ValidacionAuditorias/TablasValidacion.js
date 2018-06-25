import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RechazoList from './rechazolist';
import ModalRechazo from './modalRechazo';
import ModalAceptado from './modalAceptado';
import './style.css';
import SwitchButton from '../../lib/utils/SwitchButton';
import { TIPOS_VALIDACION } from '../../constants'

class TablasValidacion extends Component {

    constructor(props) {
        super(props);
        this.handleShowAccept = this.handleShowAccept.bind(this);
        this.handleShowReject = this.handleShowReject.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleOnSubmitAccept = this.handleOnSubmitAccept.bind(this);
        this.handleOnSubmitReject = this.handleOnSubmitReject.bind(this);
        this.initialState = this.initialState.bind(this);
        this.checkPhoto = this.checkPhoto.bind(this);
        this.checkFisica = this.checkFisica.bind(this);

        this.state = {

            showAccept: false,
            showReject: false,
            selected: [],
            selectedAccept: [],
            selectedReject: [],
            ischecked: [],
            selectedfisica: [],
            selectedPhoto: [],

        };
    }

    initialState() {
        this.setState({
            showAccept: false,
            showReject: false,
            selected: [],
            selectedAccept: [],
            selectedReject: [],
            ischecked: [],
            selectedfisica: [],
            selectedPhoto: [],
        });
    }

    onChange(carga, id, e) {

        this.state.ischecked[id] = e

        const objAuditor = {
            id: id,
            nombreArchivo: carga.nombreArchivo,
        }

        if (this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FISICA) {
            this.checkFisica(e, objAuditor);
        }

        if (this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA) {
            this.checkPhoto(e, objAuditor)
        }

    }

    checkFisica(e, objAuditor) {

        let selectedfisica = this.state.selectedfisica

        let index
        if (e) {
            selectedfisica.push(objAuditor)
        } else {
            index = selectedfisica.indexOf(objAuditor)
            selectedfisica.splice(index, 1)
        }

        this.setState({
            selectedfisica: selectedfisica
        })

        // console.log("ESTO TIENE LA CHECK FISICA", this.state.selectedfisica)
    }

    checkPhoto(e, objAuditor) {
        let selectedPhoto = this.state.selectedPhoto
        let index
        if (e) {
            selectedPhoto.push(objAuditor)
        } else {
            index = selectedPhoto.indexOf(objAuditor)
            selectedPhoto.splice(index, 1)
        }

        this.setState({
            selectedPhoto: selectedPhoto
        })

    }

    onChecked(id) {
        if (this.state.selected.length < 0) {
            return false
        }
        else {
            this.state.selected.filter((select) => {
                return select.isChecked
            })
        }
    }

    handleClose() {
        //console.log(this.state)
        this.setState({
            showAccept: false,
            showReject: false
        });
        // this.initialState()
    }


    handleShowAccept() {

        if (this.state.selectedPhoto.length == 0 && this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA ||
            this.state.selectedfisica.length == 0 && this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FISICA) {
            this.props.sendNotification('Aviso', 'Debe seleccionar al menos un elemento', 'error');
            return;
        } else {
            //Se activa el modal
            this.setState({
                showAccept: true,
            })
        }
    }

    handleOnSubmitAccept() {

        //Se arma un objeto de este tipo para mandar el POST
        //{
        //    "autorizada": true,
        //     "autorizador": "string",
        //     "idAuditoria": 0,
        //     "observaciones": "string"
        //}
        let aceptadas = new Array;
        if (this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FISICA) {
            aceptadas = this.state.selectedfisica
        }

        if (this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA) {
            aceptadas = this.state.selectedPhoto
        }

        try {
            let acept = new Array;
            aceptadas.forEach(aceptada => {

                let accpt = {
                    "autorizada": true,
                    "autorizador": this.props.usuario,
                    "idAuditoria": aceptada.id,
                    "observaciones": "Fue Aceptada"
                }
                acept.push(accpt);
            });

            this.props.saveAuditoria(acept);

        } catch (error) {
            this.props.sendNotification('Aviso', 'Ocurrrio un error ' + error, 'error');
            return;
        }
        this.handleClose();
        this.props.sendNotification('Aviso', 'Se envia la solicitud', 'info');

    }

    handleOnSubmitReject() {

        //Se arma un objeto de este tipo para mandar el POST
        //{
        //    "autorizada": false,
        //     "autorizador": "string",
        //     "idAuditoria": 0,
        //     "observaciones": "string"
        //}

        if (this.state.selectedReject.length == 0) {
            this.props.sendNotification('Aviso', 'Escribir motivo de Rechazo', 'error');
            return;
        }

        try {
            //TODO: ACTIVAR EL SAVE
            this.props.saveAuditoria(this.state.selectedReject);
            this.handleClose();
            // this.initialState();
        } catch (error) {
            this.props.sendNotification('Aviso', 'Ocurrrio un error ' + error, 'error');
            return;
        }
        this.props.sendNotification('Aviso', 'Se acepto el rechazo correctamente', 'success');

    }

    handleShowReject() {

        if (this.state.selectedPhoto.length == 0 && this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA ||
            this.state.selectedfisica.length == 0 && this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FISICA) {
            this.props.sendNotification('Aviso', 'Debe seleccionar al menos un elemento', 'error');
            return;

        } else {

            this.setState({
                selected: []
            })

            if (this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FISICA) {
                this.setState({
                    selected: this.state.selectedfisica
                })
            }

            if (this.props.tipoValidacion == TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA) {
                this.setState({
                    selected: this.state.selectedPhoto
                })
            }
            this.setState({ showReject: true });
        }

    }


    render = () => {

        const validacion = this.props.tipoValidacion;
        let { ischecked } = this.state;

        switch (validacion) {
            case TIPOS_VALIDACION.VALIDACION_FISICA:
                return (
                    <div className="row" key={this.state.timestamp}>
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading" >
                                    <i className="fa fa-2x fa-table pull-right"></i>
                                    <p>Tabla de validación de auditorías pendientes de aceptar o rechazar</p>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover table-condensed" id="tablaFisica">
                                        <thead>
                                            <tr>
                                                <th>Nombre Archivo</th>
                                                <th>Sucursal</th>
                                                <th>Creador</th>
                                                <th>Total Partidas</th>
                                                <th>Tipo Auditoria</th>
                                                <th>Rechazar/Validar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.auditoriaFisica.map((auditoria, index) => {
                                                const { id, carga } = auditoria;
                                                if (carga.tipoAuditoria.id != 4) {
                                                    return (
                                                        <tr key={`${index}-${id}`}>
                                                            <td>{carga.nombreArchivo}</td>
                                                            <td>{carga.idSucursal}</td>
                                                            <td>{carga.solicitante}</td>
                                                            <td>{carga.noPartidas}</td>
                                                            <td>{carga.tipoAuditoria.descripcion}</td>
                                                            <td>
                                                                < div >
                                                                    <SwitchButton
                                                                        name={carga.nombreArchivo}
                                                                        onChange={this.onChange.bind(this, carga, id)}
                                                                        checked={ischecked[id] || false}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="pull-right">
                                        <button style={{ marginRight: '5px' }} className="btn btn-sm btn-primary" onClick={this.handleShowReject}>Rechazar</button>
                                        <button className="btn btn-sm btn-primary" onClick={this.handleShowAccept}>Validar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ModalAceptado
                            showAccept={this.state.showAccept}
                            handleClose={this.handleClose}
                            handleOnSubmitAccept={this.handleOnSubmitAccept}
                            getAuditoriaFisica={this.props.getAuditoriaFisica}
                        />

                        <ModalRechazo
                            showReject={this.state.showReject}
                            usuario={this.props.usuario}
                            handleClose={this.handleClose}
                            selected={this.state.selected}
                            selectedReject={this.state.selectedReject}
                            handleOnSubmitReject={this.handleOnSubmitReject}
                            getAuditoriaFisica={this.props.getAuditoriaFisica}
                        />

                    </div >
                );
            case TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA:
                return (
                    <div className="row" key={this.state.timestamp}>
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading" >
                                    <i className="fa fa-2x fa-table pull-right"></i>
                                    <p>Tabla de validación de auditorías pendientes de aceptar o rechazar</p>

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover table-condensed" id="tablaFotografica">
                                        <thead>
                                            <tr>
                                                <th>Nombre Archivo</th>
                                                <th>Sucursal</th>
                                                <th>Creador</th>
                                                <th>Total Partidas</th>
                                                <th>Rechazar/Validar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.auditoriasPendientes.map((auditoria, index) => {
                                                const { id, carga } = auditoria;
                                                if (carga.tipoAuditoria.id != 4) {
                                                    return (
                                                        <tr key={`${index}-${id}`}>
                                                            <td>{carga.nombreArchivo}</td>
                                                            <td>{carga.idSucursal}</td>
                                                            <td>{carga.solicitante}</td>
                                                            <td>{carga.noPartidas}</td>
                                                            <td>
                                                                < div >
                                                                    <SwitchButton
                                                                        name={carga.nombreArchivo}
                                                                        onChange={this.onChange.bind(this, carga, id)}
                                                                        checked={ischecked[id] || false}
                                                                        key={id}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="pull-right">
                                        <button style={{ marginRight: '5px' }} className="btn btn-sm btn-primary" onClick={this.handleShowReject}>Rechazar</button>
                                        <button className="btn btn-sm btn-primary" onClick={this.handleShowAccept}>Validar</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <ModalAceptado
                            showAccept={this.state.showAccept}
                            handleClose={this.handleClose}
                            handleOnSubmitAccept={this.handleOnSubmitAccept}
                            getAuditoriaFotografica={this.props.getAuditorias}
                        />

                        <ModalRechazo
                            showReject={this.state.showReject}
                            usuario={this.props.usuario}
                            handleClose={this.handleClose}
                            selected={this.state.selected}
                            selectedReject={this.state.selectedReject}
                            handleOnSubmitReject={this.handleOnSubmitReject}
                            getAuditoriaFotografica={this.props.getAuditorias}
                        />

                    </div>

                );
        }
    }

}
export default TablasValidacion;
