import React, { Component } from 'react';
import { connect } from 'react-redux';

import FotoPartida from './FotoPartida';

class DetallePartidaCajaAbierta extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleSubmit(e){
  		e.preventDefault();
  	}

  	render(){
  		return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="sucursal" className="col-sm-4 col-form-label">Número de sucursal:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="sucursal" placeholder="" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="cliente" className="col-sm-4 col-form-label">Cliente:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="cliente" placeholder="" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="valuador" className="col-sm-4 col-form-label">Valuador:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="valuador" placeholder="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="estado-prenda" className="col-sm-4 col-form-label">Estado de la prenda:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="estado-prenda" placeholder="" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="caja" className="col-sm-4 col-form-label">Estado de la caja:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="caja" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                            	<div className="row">
                            		<div className="col-md-8">
		                                <div className="row">
		                                    <div className="col-md-6">
		                                        <div className="form-group row">
		                                            <label htmlFor="subramo" className="col-sm-4 col-form-label">Subramo:</label>
		                                            <div className="col-sm-8">
		                                                <select disabled="disabled" name="subramo" id="subramo" className="form-control input-sm"></select>
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="metal" className="col-sm-4 col-form-label">Metal:</label>
		                                            <div className="col-sm-8">
		                                                <select disabled="disabled" name="metal" id="metal" className="form-control input-sm"></select>
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="kilates" className="col-sm-4 col-form-label">Kilates:</label>
		                                            <div className="col-sm-8">
		                                                <select disabled="disabled" name="kilates" id="kilates" className="form-control input-sm"></select>
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="rango" className="col-sm-4 col-form-label">Rango:</label>
		                                            <div className="col-sm-8">
		                                                <select disabled="disabled" name="rango" id="rango" className="form-control input-sm"></select>
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="deposito" className="col-sm-4 col-form-label">Número de depósito:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="text" className="form-control input-sm" id="deposito" />
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="incremento" className="col-sm-4 col-form-label">Incremento:</label>
		                                            <div className="col-sm-8">
		                                                <select disabled="disabled" name="incremento" id="incremento" className="form-control input-sm"></select>
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="desplazamiento" className="col-sm-4 col-form-label">Desplazamiento comercial:</label>
		                                            <div className="col-sm-8">
		                                                <select disabled="disabled" name="desplazamiento" id="desplazamiento" className="form-control input-sm"></select>
		                                            </div>
		                                        </div>
		                                    </div>
		                                    <div className="col-md-6">
		                                        <div className="form-group row">
		                                            <label htmlFor="gramaje" className="col-sm-4 col-form-label">Gramaje:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="number" className="form-control input-sm" id="gramaje" />
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="avaluo" className="col-sm-4 col-form-label">Avalúo complementario:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="number" className="form-control input-sm" id="avaluo" />
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="importe" className="col-sm-4 col-form-label">Importe gramo:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="text" className="form-control input-sm" id="importe" />
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="prestamo" className="col-sm-4 col-form-label">Préstamo autorizado:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="number" className="form-control input-sm" id="prestamo" />
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="costo" className="col-sm-4 col-form-label">Costo del metal:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="number" className="form-control input-sm" id="costo" />
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="valor-comercial" className="col-sm-4 col-form-label">Valor comercial:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="number" className="form-control input-sm" id="valor-comercial" />
		                                            </div>
		                                        </div>

		                                        <div className="form-group row">
		                                            <label htmlFor="valor-monte" className="col-sm-4 col-form-label">Valor monte:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" type="number" className="form-control input-sm" id="valor-monte" />
		                                            </div>
		                                        </div>
		                                    </div>
		                                </div>
                            		</div>
                            		<div className="col-md-4">
                            			<FotoPartida />
                            		</div>
                            	</div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group row">
                                            <label htmlFor="descripcion-partida" className="col-sm-2 col-form-label">Descripción de la partida:</label>
                                            <div className="col-sm-10">
                                                <textarea disabled="disabled" name="" id="descripcion-partida" cols="20" rows="4" className="form-control input-sm"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="subramo" className="col-sm-4 col-form-label">Subramo:</label>
                                            <div className="col-sm-8">
                                                <select name="subramo" id="subramo" className="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="metal" className="col-sm-4 col-form-label">Metal:</label>
                                            <div className="col-sm-8">
                                                <select name="metal" id="metal" className="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="kilates" className="col-sm-4 col-form-label">Kilates:</label>
                                            <div className="col-sm-8">
                                                <select name="kilates" id="kilates" className="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="rango" className="col-sm-4 col-form-label">Rango:</label>
                                            <div className="col-sm-8">
                                                <select name="rango" id="rango" className="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="deposito" className="col-sm-4 col-form-label">Número de depósito:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="deposito" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="incremento" className="col-sm-4 col-form-label">Incremento:</label>
                                            <div className="col-sm-8">
                                                <select name="incremento" id="incremento" className="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="desplazamiento" className="col-sm-4 col-form-label">Desplazamiento comercial:</label>
                                            <div className="col-sm-8">
                                                <select name="desplazamiento" id="desplazamiento" className="form-control input-sm"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="gramaje" className="col-sm-4 col-form-label">Gramaje:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control input-sm" id="gramaje" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="avaluo" className="col-sm-4 col-form-label">Avalúo complementario:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control input-sm" id="avaluo" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="importe" className="col-sm-4 col-form-label">Importe gramo:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="importe" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="prestamo" className="col-sm-4 col-form-label">Préstamo autorizado:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control input-sm" id="prestamo" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="costo" className="col-sm-4 col-form-label">Costo del metal:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control input-sm" id="costo" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="valor-comercial" className="col-sm-4 col-form-label">Valor comercial:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control input-sm" id="valor-comercial" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="valor-monte" className="col-sm-4 col-form-label">Valor monte:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control input-sm" id="valor-monte" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group row">
                                            <label htmlFor="descripcion-partida" className="col-sm-2 col-form-label">Descripción de la partida:</label>
                                            <div className="col-sm-10">
                                                <textarea name="" id="descripcion-partida" cols="30" rows="4" className="form-control input-sm"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="observacion" className="col-sm-4 col-form-label">Tipo de Observación:</label>
                                            <div className="col-sm-8">
                                                <select name="coincide-descripcion" id="observacion" className="form-control input-sm"></select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group row">
                                            <label htmlFor="observacion-auditoria" className="col-sm-2 col-form-label">Observaciones auditoría:</label>
                                            <div className="col-sm-10">
                                                <textarea name="" id="observacion-auditoria" cols="30" rows="4" className="form-control input-sm"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="pull-right">
                                            <button type="button" className="btn btn-primary btn-sm">Guardar</button>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(DetallePartidaCajaAbierta);