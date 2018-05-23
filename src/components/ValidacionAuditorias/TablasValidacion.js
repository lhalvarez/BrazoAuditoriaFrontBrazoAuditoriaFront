import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RechazoList from './rechazolist';
import ModalRechazo from './modalRechazo';
import ModalAceptado from './modalAceptado';
import './style.css';
import SwitchButton from '../../lib/utils/SwitchButton';
import { TIPOS_VALIDACION } from '../../constants'
import { store } from '../../store';

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
        this.onChecked = this.onChecked.bind(this);

        this.state = {

            detalleUsuario: store.getState().session.detalleUsuario,
            showAccept: false,
            showReject: false,
            selected: [],
            selectedAccept: [],
            selectedReject: []

        };
    }

    initialState() {
        this.setState({
            selected: [],
            selectedAccept: [],
            selectedReject: []
        });
    }

    onChange(carga, id, e) {

        const selected = this.state.selected
        //console.log("este es el id", id)
        const objAuditor = {
            id: id,
            nombreArchivo: carga.nombreArchivo,
        }
        let index

        if (e) {
            selected.push(objAuditor)
        } else {
            index = selected.indexOf(objAuditor)
            selected.splice(index, 1)
        }

        this.state.selected = selected;

    }

    onChecked(id) {
        if (this.state.selected.length < 0) {
            return false
        }
        else {
            this.state.selected.filter((select) => {

                return select.id === id
            })
        }
    }


    handleClose() {
        //console.log(this.state)
        this.setState({
            showAccept: false,
            showReject: false
        });
        this.initialState()
    }


    handleShowAccept() {
        if (this.state.selected.length === 0) {
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

        let aceptadas = this.state.selectedAccept;
        this.state.selected.forEach(aceptada => {

            let accpt = {
                "autorizada": true,
                "autorizador": this.props.usuario,
                "idAuditoria": aceptada.id,
                "observaciones": "Fue Aceptada"
            }
            aceptadas.push(accpt);

        });

        try {
            this.props.saveAuditoria(aceptadas);
            this.handleClose();
            this.initialState();
        } catch (error) {
            this.props.sendNotification('Aviso', 'Ocurrrio un error ' + error, 'error');
            return;
        }
        this.props.sendNotification('Aviso', 'Se aceptaron correctamente', 'success');

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

        this.props.saveAuditoria(this.state.selectedReject);
        this.props.sendNotification('Aviso', 'Se acepto el rechazo correctamente', 'success');
        this.handleClose();
        this.initialState();


    }

    handleShowReject() {

        if (this.state.selected.length === 0) {
            this.props.sendNotification('Aviso', 'Debe seleccionar al menos un elemento', 'error');
            return;
        } else {
            //Se activa el modal
            //console.log(this.state)
            this.setState({ showReject: true });
        }

    }


    render = () => {

        const auditorias = this.props.auditorias;
        const validacion = this.props.tipoValidacion;
        const listaAuditoriasPendientes = this.props.auditoriasList;
        const sucursal = this.state.detalleUsuario.sucursal;

        switch (validacion) {
            case TIPOS_VALIDACION.VALIDACION_FISICA:
                return (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading" >
                                    <i className="fa fa-2x fa-table pull-right"></i>
                                    <p>Tabla de validación de auditorías pendientes de aceptar o rechazar</p>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Nombre Archivo</th>
                                                <th>Sucursal</th>
                                                <th>Creador</th>
                                                <th>Total Partidas</th>
                                                <th>Tipo Auditoria</th>
                                                <th>Aceptar/Rechazar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listaAuditoriasPendientes.map((auditoria, index) => {
                                                const { id, carga } = auditoria;
                                                if (carga.tipoAuditoria.id != 1) {
                                                    return (
                                                        <tr key={`${index}-${id}`}>
                                                            <td>{carga.nombreArchivo}</td>
                                                            <td>{sucursal}</td>
                                                            <td>{carga.solicitante}</td>
                                                            <td>{carga.noPartidas}</td>
                                                            <td>{carga.tipoAuditoria.descripcion}</td>
                                                            <td>
                                                                < div >
                                                                    <SwitchButton
                                                                        name={carga.nombreArchivo}
                                                                        onChange={this.onChange.bind(this, carga, id)}
                                                                    //checked={this.state.selected.every(id)}
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
                                        <button className="btn btn-sm btn-primary" onClick={this.handleShowAccept}>Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ModalAceptado
                            showAccept={this.state.showAccept}
                            handleClose={this.handleClose}
                            handleOnSubmitAccept={this.handleOnSubmitAccept}
                        />

                        <ModalRechazo
                            showReject={this.state.showReject}
                            usuario={this.props.usuario}
                            handleClose={this.handleClose}
                            selected={this.state.selected}
                            selectedReject={this.state.selectedReject}
                            handleOnSubmitReject={this.handleOnSubmitReject}
                        />

                    </div >
                );
            case TIPOS_VALIDACION.VALIDACION_FOTOGRAFIA:
                return (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading" >
                                    <i className="fa fa-2x fa-table pull-right"></i>
                                    <p>Tabla de validación de auditorías pendientes de aceptar o rechazar</p>

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Nombre Archivo</th>
                                                <th>Sucursal</th>
                                                <th>Creador</th>
                                                <th>Total Partidas</th>
                                                <th>Aceptar/Rechazar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listaAuditoriasPendientes.map((auditoria, index) => {
                                                const { id, carga } = auditoria;
                                                if (carga.tipoAuditoria.id === 1) {
                                                    return (
                                                        <tr key={`${index}-${id}`}>
                                                            <td>{carga.nombreArchivo}</td>
                                                            <td>{sucursal}</td>
                                                            <td>{carga.solicitante}</td>
                                                            <td>{carga.noPartidas}</td>
                                                            <td>
                                                                < div >
                                                                    <SwitchButton
                                                                        name={carga.nombreArchivo}
                                                                        onChange={this.onChange.bind(this, carga, id)}
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
                                        <button className="btn btn-sm btn-primary" onClick={this.handleShowAccept}>Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <ModalAceptado
                            showAccept={this.state.showAccept}
                            handleClose={this.handleClose}
                            handleOnSubmitAccept={this.handleOnSubmitAccept}
                        />

                        <ModalRechazo
                            showReject={this.state.showReject}
                            usuario={this.props.usuario}
                            handleClose={this.handleClose}
                            selected={this.state.selected}
                            selectedReject={this.state.selectedReject}
                            handleOnSubmitReject={this.handleOnSubmitReject}
                        />

                    </div>

                );
        }
    }

}
export default TablasValidacion;
