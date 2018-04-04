import React, { Component } from 'react';
import { connect } from 'react-redux';

import { store } from '../../../../store';
import { validarUsuario, requeridos } from './actions';
import { cargarDetallePartida } from '../CajaCerrada/actions';
import { history } from '../../../../history';


class FirmaValuador extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.state = {
            valuador: '',
            clave: ''
        };

		this.handleStoreChange = this.handleStoreChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
  		this.handleSubmit = this.handleSubmit.bind(this);

  		this.unsuscribe = store.subscribe(this.handleStoreChange);
  	}

  	handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleStoreChange(){
      /* PROVISIONAL */
      if(store.getState().cajaAbierta.partidaCargada)
        $('#modalFirmaValuador').modal('hide');
      /*********/

		if(store.getState().firmaValuador.loadDetail){
			$('#modalFirmaValuador').modal('hide');
	  		this.setState({ valuador: '', clave: '' });
		}
  	}

  	handleSubmit(){
      /* PROVISIONAL */
      this.props.cargarDetallePartida();
      /******/

  		const { valuador, clave } = this.state;
  		if(valuador && clave){
	  		this.props.validarUsuario(valuador, clave);
  		}
  		else{
  			this.props.requeridos();
  		}
  	}

  	componentWillUnmount(){
  		this.unsuscribe();
  	}

  	sinValuador(){
  		history.push('/auditoria-fisica-caja-cerrada');
  	}

  	render(){
  		const { valuador, clave } = this.state;
  		return (
			<div className="modal fade" id="modalFirmaValuador" tabIndex="-1" role="dialog" aria-labelledby="modalFirmaValuadorLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">

			      <div className="modal-header">
			      	<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
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
			        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.sinValuador}>Sin Valuador</button>
			        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Aceptar</button>
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

export default connect(mapStateToProps,{ validarUsuario, requeridos, cargarDetallePartida })(FirmaValuador);
