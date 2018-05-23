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
import RechazoList from './rechazolist';

class ModalRechazo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Modal isOpen={this.props.showReject} onRequestHide={this.props.handleClose} onSuccess={this.props.handleClose}>
                <ModalHeader>
                    <ModalClose onClick={this.props.handleClose} />
                    <ModalTitle>Motivo de Rechazo</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <RechazoList
                        checked={this.props.selected}
                        selectedReject={this.props.selectedReject}
                        usuario={this.props.usuario}
                    />
                </ModalBody>
                <ModalFooter>
                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.props.handleClose}>
                        Cancelar
          </button>
                    <button className='btn btn-sm btn-primary' onClick={this.props.handleOnSubmitReject}>
                        Aceptar
          </button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalRechazo;