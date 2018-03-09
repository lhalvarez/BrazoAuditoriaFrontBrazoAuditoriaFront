//Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {
	Modal,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalBody,
	ModalFooter
} from 'react-modal-bootstrap';

import { getData } from "./data.js";

class validacionPartidas extends Component {

	constructor(props, context) {
		super(props, context);
		this.handleShowAccept = this.handleShowAccept.bind(this);
		this.handleShowReject = this.handleShowReject.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.tipoValidacion = 0;
		this.toggleRow = this.toggleRow.bind(this);

		this.state = {
			data: getData(),
			showAccept: false,
			showReject: false,
			selected: {},
		};

	}
	static propTypes = {

	};

	toggleRow(nombreArchivo) {
		console.log(nombreArchivo);
		const newSelected = Object.assign({}, this.state.selected);
		newSelected[nombreArchivo] = !this.state.selected[nombreArchivo];
		this.setState({
			selected: newSelected,
		});
	}

	switchView() {
		const validacionFotografia = 1;
		const validacionFisica = 2;
		switch (this.props.path) {
			case '/validacion-partidas-fotografia':
				this.tipoValidacion = validacionFotografia
				return;
			case '/validacion-partidas-fisica':
				this.tipoValidacion = validacionFisica
				return;
		}
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

	render() {
		this.switchView();
		const validacionFotografia = 1;
		const validacionFisica = 2;

		const { data } = this.state;

		switch (this.tipoValidacion) {
			case validacionFotografia:
				return (
					<div>
						<h3>Validacion de Partidas para Auditoría por Fotografía </h3>

						<ReactTable
							previousText='Anterior'
							nextText='Siguiente'
							loadingText='Cargando..'
							noDataText='Sin Auditorias'
							pageText='Pagina'
							rowsText='Filas'
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
									Header: "",
									accessor: "",
									Cell: ({ row }) => {
										return (
											< div >
												<input
													type="checkbox"
													className="checkbox"
													onChange={() => this.toggleRow(row.archivo)}
												/>
											</div>
										);
									},
									sortable: false,
									width: 45
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
						/>

						<div className="center">
							<button className="btn btn-default" onClick={this.handleShowReject}>Rechazar</button>
							<button className="btn btn-default" onClick={this.handleShowAccept}>Aceptar</button>
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
								<button className='btn btn-default' onClick={this.handleClose}>
									Cancelar
				  			</button>
								<button className='btn btn-default' onClick={this.handleClose}>
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
								<div className="form-group">
									<label >El motivo de rechazo del Documento 12.xls es: </label>
									<textarea className="form-control" rows="5" onChange={this.onChange} />
								</div>
							</ModalBody>
							<ModalFooter>
								<button className='btn btn-default' onClick={this.handleClose}>
									Cancelar
				  			</button>
								<button className='btn btn-default' onClick={this.handleClose}>
									Aceptar
				  			</button>
							</ModalFooter>
						</Modal>

					</div>
				);


			case validacionFisica:

				return (
					<div>
						<h3>Validación de Partidas para Auditoria</h3>

						<ReactTable
							previousText='Anterior'
							nextText='Siguiente'
							loadingText='Cargando..'
							noDataText='Sin Auditorias'
							pageText='Pagina'
							rowsText='Filas'
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
									Header: "Tipo Auditoría",
									accessor: "tipo"
								},
								{
									Header: "",
									accessor: "",
									Cell: ({ row }) => {
										return (
											< div >
												<input
													type="checkbox"
													className="checkbox"
													onChange={() => this.toggleRow(row.archivo)}
												/>
											</div>
										);
									},
									sortable: false,
									width: 45
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
						/>
						<div className="center">
							<button className="btn btn-default" onClick={this.handleShowReject}>Rechazar</button>
							<button className="btn btn-info" onClick={this.handleShowAccept}>Aceptar</button>
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
								<button className='btn btn-default' onClick={this.handleClose}>
									Cancelar
				  			</button>
								<button className='btn btn-info' onClick={this.handleClose}>
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
								<div className="form-group">
									<label >El motivo de rechazo del Documento 12.xls es: </label>
									<textarea className="form-control" rows="5" onChange={this.onChange} />
								</div>
							</ModalBody>
							<ModalFooter>
								<button className='btn btn-danger' onClick={this.handleClose}>
									Cancelar
				  			</button>
								<button className='btn btn-info' onClick={this.handleClose}>
									Aceptar
				  			</button>
							</ModalFooter>
						</Modal>
					</div>
				);
		}
	}
}



export default validacionPartidas;
