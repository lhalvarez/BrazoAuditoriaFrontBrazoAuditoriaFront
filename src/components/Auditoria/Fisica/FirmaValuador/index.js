import React, { Component } from 'react';
import { connect } from 'react-redux';

import { store } from '../../../../store';
import { validarUsuario, requeridos, dismiss } from './actions';
import { cargarDetallePartida } from '../CajaAbierta/actions';
import { history } from '../../../../history';
import { Button } from 'react-bootstrap';


class FirmaValuador extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.state = {
            valuador: '',
            clave: '',
            loadDetail: false
        };

		  this.handleChange = this.handleChange.bind(this);
  		this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

  	handleSubmit(){
  		const { valuador, clave } = this.state;

  		if(valuador && clave){
        if(valuador.trim() != '' && clave.trim() != ''){
          this.props.validarUsuario(valuador, clave);
        }
        else{
          this.props.requeridos('El contenido de los campos es incorrecto.');
        }
  		}
  		else{
  			this.props.requeridos('Los campos "Valuador" y "Clave" son requeridos.');
  		}
  	}

  	sinValuador(){
  		history.push('/auditoria-fisica-caja-cerrada');
  	}

    renderModal(){
      if(this.props.loadDetail){
        this.props.dismiss();
        this.props.cargarDetallePartida();
      }
    }

    componentDidUpdate(){
      this.renderModal();
    }

    render(){
  		const { valuador, clave } = this.state;

  		return (
			<div className="modal fade" id="modalFirmaValuador" tabIndex="-1" role="dialog" aria-labelledby="modalFirmaValuadorLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">

			      <div className="modal-header">
              <Button className="close" bsStyle="primary" data-dismiss="modal"><span>&times;</span></Button>
              <h5 className="modal-title" id="modalFirmaValuadorLabel">Firma de Valuador</h5>
			      </div>

			      <div className="modal-body">

                    <div className="form-group row">
                        <label htmlFor="valuador" className="col-sm-4 col-form-label">Valuador:</label>
                        <div className="col-sm-8">
                            <input type="text" className="col-sm-8 col-form-control input-sm" name="valuador" id="valuador" value={valuador} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="clave" className="col-sm-4 col-form-label">Clave:</label>
                        <div className="col-sm-8">
                            <input type="password" className="col-sm-8 col-form-control input-sm" name="clave" id="clave" value={clave} onChange={this.handleChange}/>
                        </div>
                    </div>

			      </div>

            <div className="modal-footer">
              <div className="text-center">
                <Button bsStyle="default" data-dismiss="modal">Cerrar</Button>
                <Button bsStyle="warning" data-dismiss="modal" onClick={this.sinValuador}>Sin Valuador</Button>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Aceptar</Button>
              </div>
            </div>

			    </div>
			  </div>
			</div>
  		);
  	}
}

function mapStateToProps(state){
  return {
    valuador: state.firmaValuador.valuador,
    clave: state.firmaValuador.clave,
    loadDetail: state.firmaValuador.loadDetail
  }
}

export default connect(mapStateToProps,{ validarUsuario, requeridos, cargarDetallePartida, dismiss })(FirmaValuador);
