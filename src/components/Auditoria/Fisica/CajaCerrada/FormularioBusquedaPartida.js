import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../../../store';

class FormularioBusquedaPartida extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.search = this.search.bind(this);
  	}

  	search(e){
  		e.preventDefault();
  		let cajaBusqueda = $('#caja').val();
  		let partidaBusqueda = $('#partida').val();
      this.props.obtenerDetallePartida(cajaBusqueda,partidaBusqueda);
  	}

		componentWillUnmount(){
			store.fromCaToCc = false;
		}
		componentWillMount(){
			if(store.fromCaToCc){
				this.props.obtenerDetallePartida(store.fromCaToCc.rfid,store.fromCaToCc.folio);
			}
		}

  	render(){
  		return (
            <div className="row">
                <div className="col-lg-12">
                	<form onSubmit={this.search} id="formSearchCc">
	                    <div className="panel panel-default">
	                        <div className="panel-heading">
	                            <p>Criterios de Búsqueda <i className="fa fa-3x fa-archive"></i></p>
	                        </div>
	                        <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="caja" className="col-sm-4 col-form-label">Número de caja:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="caja" defaultValue={store.fromCaToCc? store.fromCaToCc.rfid : ''} required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="partida" className="col-sm-4 col-form-label">Número de partida:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="partida" defaultValue={store.fromCaToCc? store.fromCaToCc.folio : ''} required/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
	                        </div>
	                        <div className="panel-footer">
	                            <div className="row">
	                                <div className="col-sm-6">

	                                </div>
	                                <div className="col-sm-6">
	                                    <div className="pull-right">
	                                        <button className="btn btn-primary btn-sm">Buscar</button>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
                    </form>
                </div>
            </div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(FormularioBusquedaPartida);
