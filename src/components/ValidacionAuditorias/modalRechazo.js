// Dependencies
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import RechazoList from './rechazolist';

class ModalRechazo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Modal
                show={this.props.showReject}
                onHide={this.props.handleClose}
            >
                <Modal.Header>
                    <Modal.Title>Motivo de Rechazo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RechazoList
                        checked={this.props.selected}
                        selectedReject={this.props.selectedReject}
                        usuario={this.props.usuario}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.props.handleClose}>
                        Cancelar
                    </button>
                    <button className='btn btn-sm btn-primary' onClick={this.props.handleOnSubmitReject}>
                        Aceptar
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalRechazo;
