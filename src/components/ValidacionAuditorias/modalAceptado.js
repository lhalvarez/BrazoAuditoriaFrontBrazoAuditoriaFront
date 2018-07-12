// Dependencies
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ModalAceptado extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Modal
                show={this.props.showAccept}
                onHide={this.props.handleClose}
            >
                <Modal.Header>
                    <Modal.Title>AVISO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Se validaran las auditorias seleccionadas, ¿Desea Continuar? </label>
                </Modal.Body>
                <Modal.Footer>
                    <button style={{ marginRight: '5px' }} className='btn btn-sm btn-primary' onClick={this.props.handleClose}>
                        Cancelar
                    </button>
                    <button className='btn btn-sm btn-primary' onClick={this.props.handleOnSubmitAccept}>
                        Aceptar
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }


}

export default ModalAceptado;
