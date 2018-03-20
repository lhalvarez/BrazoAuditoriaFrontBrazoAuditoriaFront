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

        this.state = {

            showAccept: false,
            showReject: false,
            selected: [],

        };
    }

    onChange(auditoria, e) {

        const selected = this.state.selected
        const objAuditor = {
            id: auditoria.id,
            nombreArchivo: auditoria.nombreArchivo
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
        this.setState({
            showAccept: false,
            showReject: false
        });
    }


    handleShowAccept() {
        this.setState({ showAccept: true });
        console.log(this.state);
    }

    handleShowReject() {
        this.setState({ showReject: true });
        console.log(this.state);
    }


    render = () => {

        const validacionFotografia = 1;
        const validacionFisica = 2;

        const auditorias = this.props.auditorias;
        const validacion = this.props.tipoValidacion;

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
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {auditorias.map((auditoria, index) => {
                                            const { id, nombreArchivo, totalPartidas, tipoAuditoria } = auditoria;
                                            return (
                                                <tr key={`${index}-${id}`}>
                                                    <td>{nombreArchivo}</td>
                                                    <td>0</td>
                                                    <td>roberto</td>
                                                    <td>{totalPartidas}</td>
                                                    <td>Caja Cerrada</td>
                                                    <td>
                                                        < div >
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                value={id}
                                                                onChange={this.onChange.bind(this, auditoria)}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="pull-right">
                                            <button className="btn btn-sm btn-primary" onClick={this.handleShowReject}>Rechazar</button>
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
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  				</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
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
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  			</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
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
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {auditorias.map((auditoria, index) => {
                                            const { id, nombreArchivo, totalPartidas } = auditoria;
                                            return (
                                                <tr key={`${index}-${id}`}>
                                                    <td>{nombreArchivo}</td>
                                                    <td>0</td>
                                                    <td>roramirez</td>
                                                    <td>{totalPartidas}</td>
                                                    <td>
                                                        < div >
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                value={id}
                                                                onChange={this.onChange.bind(this, auditoria)}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="pull-right">
                                            <button className="btn btn-sm btn-primary" onClick={this.handleShowReject}>Rechazar</button>
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
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  				</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
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
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
                                        Cancelar
				  			</button>
                                    <button className='btn btn-sm btn-primary' onClick={this.handleClose}>
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