import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerTitle from '../Global/ContainerTitle';
import "react-table/react-table.css";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import RechazoList from './rechazolist';
import './style.css';

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

        this.state = {

            showAccept: false,
            showReject: false,
            selected: [],
            selectedAccept: [],
            selectedReject: [],

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
        const objAuditor = {
            id: id,
            nombreArchivo: carga.nombreArchivo,
            validador: carga.solicitante
        }
        let index

        if (e.target.checked) {
            selected.push(objAuditor)
        } else {
            index = selected.indexOf(objAuditor)
            selected.splice(index, 1)
        }

        this.setState({ selected: selected })
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
            this.setState({ showAccept: true });
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
                "autorizador": aceptada.validador,
                "idAuditoria": aceptada.id,
                "observaciones": "Fue Aceptada"
            }
            aceptadas.push(accpt);

        });

        try {
            this.props.saveAuditoria(aceptadas);
            this.props.sendNotification('Aviso', 'Se aceptaron correctamente', 'success');
            this.handleClose();
            this.initialState();
        } catch (error) {
            this.props.sendNotification('Aviso', 'Ocurrrio un error ' + error, 'error');
            return;
        }

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

        const validacionFotografia = 1;
        const validacionFisica = 2;

        const auditorias = this.props.auditorias;
        const validacion = this.props.tipoValidacion;
        const listaAuditoriasPendientes = this.props.auditoriasList

        switch (validacion) {
            case validacionFisica:
                return (
                    <div className="row">
                        <ContainerTitle title={'Validación de Auditoría Fisica'} />
                        <div className="col-lg-12">
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
                                        {auditorias.map((auditoria, index) => {
                                            const { id, carga } = auditoria;
                                            if (carga.tipoAuditoria.id === 2 || carga.tipoAuditoria.id === 3) {
                                                return (
                                                    <tr key={`${index}-${id}`}>
                                                        <td>{carga.nombreArchivo}</td>
                                                        <td>{carga.idSucursal}</td>
                                                        <td>{carga.solicitante}</td>
                                                        <td>{carga.noPartidas}</td>
                                                        <td>{carga.tipoAuditoria.descripcion}</td>
                                                        <td>
                                                            < div >
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                    value={id}
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


                            <Modal isOpen={this.state.showAccept} onRequestHide={this.handleClose} onSuccess={this.handleClose}>
                                <ModalHeader>
                                    <ModalClose onClick={this.handleClose} />
                                    <ModalTitle>AVISO</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <label>Se validaran las auditorias seleccionadas, ¿Desea Continuar? </label>
                                </ModalBody>
                                <ModalFooter>
                                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  				</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleOnSubmitAccept}>
                                        Aceptar
				  				</button>
                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={this.state.showReject} onRequestHide={this.handleClose} onSuccess={this.handleClose}>
                                <ModalHeader>
                                    <ModalClose onClick={this.handleClose} />
                                    <ModalTitle>Motivo de Rechazo</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <RechazoList
                                        checked={this.state.selected}
                                        selectedReject={this.state.selectedReject}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  			</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleOnSubmitReject}>
                                        Aceptar
				  			</button>
                                </ModalFooter>
                            </Modal>

                        </div>
                    </div>
                );
            case validacionFotografia:
                return (
                    <div className="row">
                        <ContainerTitle title={'Validación de Auditoría por Fotografía'} />
                        <div className="col-lg-12">
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
                                        {auditorias.map((auditoria, index) => {
                                            const { id, carga } = auditoria;
                                            if (carga.tipoAuditoria.id === 1) {
                                                return (
                                                    <tr key={`${index}-${id}`}>
                                                        <td>{carga.nombreArchivo}</td>
                                                        <td>{carga.idSucursal}</td>
                                                        <td>{carga.solicitante}</td>
                                                        <td>{carga.noPartidas}</td>
                                                        <td>
                                                            < div >
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                    value={id}
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


                            <Modal isOpen={this.state.showAccept} onRequestHide={this.handleClose} onSuccess={this.handleClose}>
                                <ModalHeader>
                                    <ModalClose onClick={this.handleClose} />
                                    <ModalTitle>AVISO</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <label>Se validaran las auditorias seleccionadas, ¿Desea Continuar? </label>
                                </ModalBody>
                                <ModalFooter>
                                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  				</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleOnSubmitAccept}>
                                        Aceptar
				  				</button>
                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={this.state.showReject} onRequestHide={this.handleClose} onSuccess={this.handleClose}>
                                <ModalHeader>
                                    <ModalClose onClick={this.handleClose} />
                                    <ModalTitle>Motivo de Rechazo</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <RechazoList
                                        checked={this.state.selected}
                                        selectedReject={this.state.selectedReject}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  			</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleOnSubmitReject}>
                                        Aceptar
				  			</button>
                                </ModalFooter>
                            </Modal>

                        </div>
                    </div>
                );
        }
    }

}
export default TablasValidacion;
