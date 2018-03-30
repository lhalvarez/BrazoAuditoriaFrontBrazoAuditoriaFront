import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cargarDetallePartida } from '../CajaCerrada/actions';
import { history } from '../../../../history';

class FirmaValuador extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleSubmit(){
  		this.props.cargarDetallePartida();
  	}

  	sinValuador(){
  		history.push('/auditoria-fisica-caja-cerrada');
  	}

  	render(){
  		return (
			<div className="modal fade" id="modalFirmaValuador" tabIndex="-1" role="dialog" aria-labelledby="modalFirmaValuadorLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="modalFirmaValuadorLabel">Firma de Valuador</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        Formulario de firma de valuador
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.sinValuador}>Sin Valuador</button>
			        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Aceptar</button>
			      </div>
			    </div>
			  </div>
			</div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps,{ cargarDetallePartida })(FirmaValuador);
