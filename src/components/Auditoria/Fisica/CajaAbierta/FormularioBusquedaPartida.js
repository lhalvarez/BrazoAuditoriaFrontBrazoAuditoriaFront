import React, { Component } from 'react';
import { connect } from 'react-redux';

import { store } from '../../../../store';
import { obtenerDetallePartida } from './actions';
import FirmaValuador from '../FirmaValuador';

class FormularioBusquedaPartida extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();
      /*
      * La propiedad initKey funciona para forzar la montura del modal, y que así siempre se tenga que inicializar
      */
      this.state = {
        rfid: '',
        folio: '',
        submitted: false,
        initKey: Math.random()
      };

      this.search = this.search.bind(this);
      this.handleStoreChange = this.handleStoreChange.bind(this);
  		this.handleChange = this.handleChange.bind(this);

      this.unsuscribe = store.subscribe(this.handleStoreChange);
  	}

    handleStoreChange(){
      if(store.getState().cajaAbierta.loadDetail){
        const { rfid, folio } = this.state;

        this.props.obtenerDetallePartida(rfid,folio);
      }
    }

    handleChange(e){
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    validate(data){
      if(!data)
        return <div className="help-block">Campo requerido</div>;

      if(isNaN(data))
        return <div className="help-block">El campo debe ser numérico</div>;

      return false;
    }

  	search(e){
  		e.preventDefault();
      this.setState({
        submitted: true,
        initKey: Math.random()
      });
  	}

    componentWillUnmount(){
      this.unsuscribe();
    }

    componentDidUpdate(){
      const { rfid, folio, submitted } = this.state;

      if(rfid && folio && submitted){
        $('#modalFirmaValuador').modal('show');
        this.setState({ submitted: false });
				store.fromCaToCc = {rfid:rfid , folio:folio};
      }
    }

  	render(){
      const { rfid, folio, submitted, initKey } = this.state;

  		return (
            <div className="row">
                <div className="col-lg-12">
                	<form onSubmit={this.search}>
	                    <div className="panel panel-default">
	                        <div className="panel-heading">
	                            <p>Criterios de Búsqueda <i className="fa fa-3x fa-dropbox"></i></p>
	                        </div>
	                        <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={'form-group row'+( (submitted && this.validate(rfid)) ? ' has-error' : '' )}>
                                            <label htmlFor="rfid" className="col-sm-4 col-form-label">Número de caja:</label>
                                            <div className="col-sm-8">
                                                <input type="number" name="rfid" value={rfid} className="form-control input-sm" id="rfid" onChange={this.handleChange} />
                                                { submitted && this.validate(rfid) }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className={'form-group row'+( (submitted && this.validate(folio)) ? ' has-error' : '' )}>
                                            <label htmlFor="folio" className="col-sm-4 col-form-label">Número de partida:</label>
                                            <div className="col-sm-8">
                                                <input type="number" name="folio" value={folio} className="form-control input-sm" id="folio" onChange={this.handleChange} />
                                                { submitted && this.validate(folio) }
                                            </div>
                                        </div>
                                    </div>
                                </div>
	                        </div>
	                        <div className="panel-footer">
	                            <div className="row">
	                                <div className="col-sm-offset-6 col-sm-6">
	                                    <div className="pull-right">
	                                        <button className="btn btn-primary btn-sm">Buscar</button>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
                    </form>
                </div>
                <div key={initKey}>
                  <FirmaValuador />
                </div>
            </div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps,{obtenerDetallePartida})(FormularioBusquedaPartida);
