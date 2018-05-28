import React, { Component } from 'react';
import { connect } from 'react-redux';

import { store } from '../../store';
import { deleteDoc,deleteAuditoria,closeModal } from './actions';
import { history } from '../../history';
import { Button } from 'react-bootstrap';


class ModalConfirmacion extends Component{


  	constructor(){
  		super();

  		this.state = {
            confirmarEliminar: true
        };

  		this.handleSubmit = this.handleSubmit.bind(this);
  	}


  	handleSubmit(){
  		const { valuador, clave } = this.state;
			this.props.deleteDoc(this.props.idAuditoria);
			this.props.closeModal();

  	}


    renderModal(){
      if(this.state.loadDetail){
        this.props.dismiss();
      }
    }

    componentDidUpdate(){
      this.renderModal();
    }

    render(){
			const idAuditroia = this.props.idAuditoria;
  		return (
			<div className="modal fade" id="modalConfirmacion" tabIndex="-1" role="dialog" aria-labelledby="modalConfirmacionLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">

			      <div className="modal-header">
              <Button className="close" bsStyle="primary" data-dismiss="modal"><span>&times;</span></Button>
              <h5 className="modal-title" id="modalConfirmacionLabel">Confirmación de eliminación</h5>
			      </div>

			      <div className="modal-body">

                    <h3>¿Seguro que desea eliminar la auditoria {idAuditroia}?</h3>

			      </div>

            <div className="modal-footer">
              <div className="text-center">
                <Button bsStyle="default" data-dismiss="modal">Cancelar</Button>
                <Button bsStyle="danger" onClick={this.handleSubmit}>Eliminar</Button>
              </div>
            </div>

			    </div>
			  </div>
			</div>
  		);
  	}
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps,{ deleteDoc,deleteAuditoria, closeModal })(ModalConfirmacion);
