// Dependencies
import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';


class ModalAceptado extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Modal isOpen={this.props.showAccept} onRequestHide={this.props.handleClose} onSuccess={this.props.handleClose}>
                <ModalHeader>
                    <ModalClose onClick={this.props.handleClose} />
                    <ModalTitle>AVISO</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <label>Se validaran las auditorias seleccionadas, ¿Desea Continuar? </label>
                </ModalBody>
                <ModalFooter>
                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.props.handleClose}>
                        Cancelar
              </button>
                    <button className='btn btn-sm btn-primary' onClick={this.props.handleOnSubmitAccept}>
                        Aceptar
              </button>
                </ModalFooter>
            </Modal>
        );
    }


}

export default ModalAceptado;