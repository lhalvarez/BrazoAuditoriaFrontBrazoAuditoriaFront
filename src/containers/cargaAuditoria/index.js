// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table'
import "react-table/react-table.css";
import "./style.css";
import Formulario from './formulario';
import {getDocs} from './actions';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

import { getData } from "./data.js";

class cargaAuditoria extends Component{

  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: getData(),
      show: false
    };
  }


	static propTypes = {

  	};

    handleClose() {
      this.setState({ show: false });
    }

    handleShow() {
      this.setState({ show: true });
    }

    handleSubmit(e) {
      console.log('laravel');
      e.preventDefault();
      this.setState({ show: true });
    }

	render(){
    const { data } = this.state;
		return (
			<div>
				<h3>Página de carga Auditoria</h3>


        <ReactTable
        data={data}
            columns={[
              {
                Header: "Nombre del Archivo",
                accessor: "archivo"
              },
              {
                Header: "Sucursal",
                accessor: "sucursal"
              },
              {
                Header: "Creador",
                accessor: "creador"
              },
              {
                Header: "Partidas",
                accessor: "partidas"
              },
              {
                Header: "Estatus",
                accessor: "status"
              },
              {
                Header: "Acción",
                accessor: "action"
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
        />
        <div className="center">
          <button  className="btn btn-info" onClick={this.handleShow}>Cargar documento</button>
        </div>

        <Modal isOpen={this.state.show} onRequestHide={this.handleClose}>
          <ModalHeader>
            <ModalClose onClick={this.handleClose}/>
            <ModalTitle>Modal title</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Formulario />
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.handleClose}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

			</div>
		);
	}
}

export default cargaAuditoria;
