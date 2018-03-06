// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table'
import "react-table/react-table.css";
import "./style.css";
import {getDocs} from './actions';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios, { post } from 'axios';
import {saveDoc} from './actions'

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
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.state = {
      data: getData(),
      show: false,
      file:null,
    };
    this.tipoAuditoria = 0;


  }
	  static propTypes = {

  	};
    switchView(){
      if(this.props.path === '/cargar-partidas-fotografia') this.tipoAuditoria = 1;
      if(this.props.path === '/cargar-partidas-fisica') this.tipoAuditoria = 2;
      console.log(this.tipoAuditoria);
    }

    handleClose() {
      this.setState({ show: false });
    }

    handleShow() {
      this.setState({ show: true });
      console.log(this.state);
    }
    onFormSubmit(e){
      e.preventDefault();
      this.handleClose();
      //saveDoc();
      this.fileUpload(this.state.file).then((response)=>{
        console.log(response.data);

      })
    }
    onChange(e) {
      this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
      const url = 'https://dev1775-auditoria.mybluemix.net/auditoria/cargarArchivo';
      var formData = new FormData();
      formData.append('file',file,'file')
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      //saveDoc(formData);
      //console.log(url, formData);
      return post(url,formData);
    }


	render(){
    this.switchView();
    if(this.tipoAuditoria === 1){
      const { data } = this.state;
      return (
  			<div>
  				<h3>Carga de Auditoria por Fotografía</h3>


          <ReactTable
          data={data}
              columns={[
                {
                  Header: "Id Auditoría",
                  accessor: "id_auditoria"
                },
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
                  Header: "Opciones",
                  accessor: "action",
                  Cell: row=>(
                    <div>

                      <button  className="btn btn-danger" onClick={this.erase}>Eliminar</button>
                    </div>
                  )
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
          />
          <div className="center">
            <button  className="btn btn-info" onClick={this.handleShow}>Cargar documento</button>
          </div>

          <Modal isOpen={this.state.show} onRequestHide={this.handleClose} onSuccess={this.handleClose}>
            <ModalHeader>
              <ModalClose onClick={this.handleClose}/>
              <ModalTitle>Modal title</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form className="form-horizontal" onSubmit={this.onFormSubmit}>

                  <div className="form-group">
                  <label htmlFor="documento" className="col-sm-2 control-label">Documento</label>
                  <div className="col-sm-10">
                    <input type="file" className="form-control" id="documento" onChange={this.onChange}  />
                  </div>
                  </div>
                  <div className="form-group">
                  <div className="center">
                    <button type="submit" className="btn btn-primary">Cargar</button>
                  </div>
                  </div>
                </form>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.handleClose}>
                Cancelar
              </button>
            </ModalFooter>
          </Modal>

  			</div>
  		);
    }else{

    const { data } = this.state;
        return (
          <div>
    				<h3>Carga de Auditoria Física</h3>


            <ReactTable
            data={data}
                columns={[
                  {
                    Header: "Id Auditoría",
                    accessor: "id_auditoria"
                  },
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
                    Header: "Tipo Auditoría",
                    accessor: "tipo"
                  },
                  {
                    Header: "Opciones",
                    accessor: "action",
                    Cell: row=>(
                      <div>

                        <button  className="btn btn-danger" onClick={this.erase}>Eliminar</button>
                      </div>
                    )
                  }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <div className="center">
              <button  className="btn btn-info" onClick={this.handleShow}>Cargar nuevo archivo</button>
            </div>

            <Modal isOpen={this.state.show} onRequestHide={this.handleClose} onSuccess={this.handleClose}>
              <ModalHeader>
                <ModalClose onClick={this.handleClose}/>
                <ModalTitle>Configuración de carga</ModalTitle>
              </ModalHeader>
              <ModalBody>
                  <form className="form-horizontal" onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                    <label htmlFor="documento" className="col-sm-4 control-label">Tipo de auditoría</label>
                    <div className="col-sm-8">
                    <select className="form-control" id="documento">
                      <option value="0" disabled>Seleccione...</option>
                      <option value="1">Caja Cerrada</option>
                      <option value="2">Caja Abierta</option>
                    </select>

                    </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="documento" className="col-sm-4 control-label">Documento</label>
                    <div className="col-sm-8">
                      <input type="file" className="form-control" id="documento" onChange={this.onChange}  />
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="center">
                      <button type="submit" className="btn btn-primary">Cargar</button>
                    </div>
                    </div>
                  </form>
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
}

export default cargaAuditoria;
