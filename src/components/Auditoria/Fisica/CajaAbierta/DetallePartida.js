import React, { Component } from 'react';
import { connect } from 'react-redux';

import { store } from '../../../../store';
import FotoPartida from '../FotoPartida';

class DetallePartidaCajaAbierta extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

        this.state = {
            partidaCargada: false,
            datos: {},
            tiposObservacion: []
        };

        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
  		this.clearForm = this.clearForm.bind(this);

        this.unsuscribe = store.subscribe(this.handleStoreChange);
  	}

    handleStoreChange(){
        let storeState = store.getState().cajaAbierta;

        if(storeState.partidaCargada){
            this.setState({ 
                partidaCargada: true,
                datos: {
                    ...storeState.detallePartida,
                    ...storeState.resultado
                },
                tiposObservacion: storeState.tiposObservacion
            });
        }
        else{
            this.setState({ 
                partidaCargada: false,
                datos: {},
                tiposObservacion: []
            });
        }
    }

    handleInputChange(e){
        const { name, value } = e.target;

        this.setState(prevState => { 
            return {datos: Object.assign({},{...prevState.datos},{[name]:value})};
        });
    }

  	handleSubmit(e){
  		e.preventDefault();
  	}

    toggleForm(e){
        let $icon = $(e.target);
        let $panelBody = $icon.parents('.panel').find('.panel-body');
        let $panelFooter = $icon.parents('.panel').find('.panel-footer');

        $panelBody.toggle(() => $icon.toggleClass('fa-toggle-up fa-toggle-down'));
        $panelFooter.toggle();
    }

    clearForm(e){
        let $icon = $(e.target);
        let $panelBody = $icon.parents('.panel').find('.panel-body');

        $panelBody.find('input,textarea').each((index,element) => element.value = '');
    }

    componentWillUnmount(){
      this.unsuscribe();
    }

  	render(){
        const { partidaCargada, datos, tiposObservacion } = this.state;

        if(!partidaCargada)
            return <div></div>;

        /* El formulario se carga hasta que los datos de la partida hayan sido cargados del servicio */
  		return (
            <form onSubmit={this.handleSubmit} ref={el => this.el = el}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <p>Datos Generales</p>
                                <div className="panel-action-icons">
                                    <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        {
                                        ('sucursal' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="sucursal" className="col-sm-4 col-form-label">Número de sucursal:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.sucursal} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="sucursal" name="sucursal" placeholder="" />
                                                <i className="fa fa-check-circle"></i>
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('nombreCliente' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="nombreCliente" className="col-sm-4 col-form-label">Cliente:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.nombreCliente} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="nombreCliente" name="nombreCliente" placeholder="" />
                                                <i className="fa fa-times-circle"></i>
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('numeroValuador' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="numeroValuador" className="col-sm-4 col-form-label">Valuador:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.numeroValuador} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="numeroValuador" name="numeroValuador" placeholder="" />
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('estadoPrenda' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="estadoPrenda" className="col-sm-4 col-form-label">Estado de la prenda:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.estadoPrenda} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="estadoPrenda" name="estadoPrenda" placeholder="" />
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('estadoCaja' in datos) &&
                                        <div className="form-group row">
                                            <label htmlFor="estadoCaja" className="col-sm-4 col-form-label">Estado de la caja:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.estadoCaja} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="estadoCaja" name="estadoCaja" placeholder="" />
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <p>Fotografía de la Partida</p>
                                <div className="panel-action-icons">
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <FotoPartida 
                                    src="https://cdn0.bodas.com.mx/emp/fotos/8/7/2/2/1948197-10153831586765471-1974888041-n_5_118722.jpg" 
                                    crop={{
                                        superiorX: 150,
                                        superiorY: 35,
                                        inferiorX: 650,
                                        inferiorY: 335
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <p>Detalle de la Partida</p>
                                <div className="panel-action-icons">
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                            	<div className="row">
                            		<div className="col-md-12">
		                                <div className="row">
		                                    <div className="col-md-12">
                                                {
                                                ('subramo' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="subramo" className="col-sm-4 col-form-label">Subramo:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.subramo} type="text" className="form-control input-sm" id="subramo" name="subramo" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('metal' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="metal" className="col-sm-4 col-form-label">Metal:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.metal} type="text" className="form-control input-sm" id="metal" name="metal" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('kilates' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="kilates" className="col-sm-4 col-form-label">Kilates:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.kilates} type="text" className="form-control input-sm" id="kilates" name="kilates" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('rango' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="rango" className="col-sm-4 col-form-label">Rango:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.rango} type="text" className="form-control input-sm" id="rango" name="rango" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('deposito' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="deposito" className="col-sm-4 col-form-label">Número de depósito:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.deposito} type="text" className="form-control input-sm" id="deposito" name="deposito" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('incremento' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="incremento" className="col-sm-4 col-form-label">Incremento:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.incremento} type="text" className="form-control input-sm" id="incremento" name="incremento" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('desplazamientoComercial' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="desplazamientoComercial" className="col-sm-4 col-form-label">Desplazamiento comercial:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.desplazamientoComercial} type="text" className="form-control input-sm" id="desplazamientoComercial" name="desplazamientoComercial" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('gramaje' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="gramaje" className="col-sm-4 col-form-label">Gramaje:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.gramaje} type="text" className="form-control input-sm" id="gramaje" name="gramaje" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('avaluoComplementario' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="avaluoComplementario" className="col-sm-4 col-form-label">Avalúo complementario:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.avaluoComplementario} type="text" className="form-control input-sm" id="avaluoComplementario" name="avaluoComplementario" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('importeGramo' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="importeGramo" className="col-sm-4 col-form-label">Importe gramo:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.importeGramo} type="text" className="form-control input-sm" id="importeGramo" name="importeGramo" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('prestamo' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="prestamo" className="col-sm-4 col-form-label">Préstamo autorizado:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.prestamo} type="text" className="form-control input-sm" id="prestamo" name="prestamo" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('costoMetal' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="costoMetal" className="col-sm-4 col-form-label">Costo del metal:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.costoMetal} type="text" className="form-control input-sm" id="costoMetal" name="costoMetal" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('valorComercial' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="valorComercial" className="col-sm-4 col-form-label">Valor comercial:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.valorComercial} type="text" className="form-control input-sm" id="valorComercial" name="valorComercial" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('valorMonte' in datos) &&
		                                        <div className="form-group row">
		                                            <label htmlFor="valorMonte" className="col-sm-4 col-form-label">Valor monte:</label>
		                                            <div className="col-sm-8">
		                                                <input disabled="disabled" value={datos.valorMonte} type="text" className="form-control input-sm" id="valorMonte" name="valorMonte" placeholder="" />
		                                            </div>
		                                        </div>
                                                }

                                                {
                                                ('descripcion' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="descripcion" className="col-sm-4 col-form-label">Descripción de la partida:</label>
                                                    <div className="col-sm-8">
                                                        <textarea cols="20" rows="4" disabled="disabled" value={datos.descripcion} type="text" className="form-control input-sm" id="descripcion" name="descripcion"></textarea>
                                                    </div>
                                                </div>
                                                }
                                            </div>
		                                </div>
                            		</div>
                            	</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <p>Detalle de la Partida (Edición)</p>
                                <div className="panel-action-icons">
                                    <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-12">
                                                {
                                                ('subramo' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="subramoDin" className="col-sm-4 col-form-label">Subramo:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('subramoDin' in datos) ? datos.subramoDin : datos.subramo} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="subramoDin" name="subramoDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('metal' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="metalDin" className="col-sm-4 col-form-label">Metal:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('metalDin' in datos) ? datos.metalDin : datos.metal} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="metalDin" name="metalDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('kilates' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="kilatesDin" className="col-sm-4 col-form-label">Kilates:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('kilatesDin' in datos) ? datos.kilatesDin : datos.kilates} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="kilatesDin" name="kilatesDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('rango' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="rangoDin" className="col-sm-4 col-form-label">Rango:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('rangoDin' in datos) ? datos.rangoDin : datos.rango} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="rangoDin" name="rangoDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('deposito' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="depositoDin" className="col-sm-4 col-form-label">Número de depósito:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('depositoDin' in datos) ? datos.depositoDin : datos.deposito} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="depositoDin" name="depositoDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('incremento' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="incrementoDin" className="col-sm-4 col-form-label">Incremento:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('incrementoDin' in datos) ? datos.incrementoDin : datos.incremento} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="incrementoDin" name="incrementoDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('desplazamientoComercial' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="desplazamientoComercialDin" className="col-sm-4 col-form-label">Desplazamiento comercial:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('desplazamientoComercialDin' in datos) ? datos.desplazamientoComercialDin : datos.desplazamientoComercial} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="desplazamientoComercialDin" name="desplazamientoComercialDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('gramaje' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="gramajeDin" className="col-sm-4 col-form-label">Gramaje:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('gramajeDin' in datos) ? datos.gramajeDin : datos.gramaje} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="gramajeDin" name="gramajeDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('avaluoComplementario' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="avaluoComplementarioDin" className="col-sm-4 col-form-label">Avalúo complementario:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('avaluoComplementarioDin' in datos) ? datos.avaluoComplementarioDin : datos.avaluoComplementario} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="avaluoComplementarioDin" name="avaluoComplementarioDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('importeGramo' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="importeGramoDin" className="col-sm-4 col-form-label">Importe gramo:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('importeGramoDin' in datos) ? datos.importeGramoDin : datos.importeGramo} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="importeGramoDin" name="importeGramoDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('prestamo' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="prestamoDin" className="col-sm-4 col-form-label">Préstamo autorizado:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('prestamoDin' in datos) ? datos.prestamoDin : datos.prestamo} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="prestamoDin" name="prestamoDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('costoMetal' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="costoMetalDin" className="col-sm-4 col-form-label">Costo del metal:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('costoMetalDin' in datos) ? datos.costoMetalDin : datos.costoMetal} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="costoMetalDin" name="costoMetalDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('valorComercial' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="valorComercialDin" className="col-sm-4 col-form-label">Valor comercial:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('valorComercialDin' in datos) ? datos.valorComercialDin : datos.valorComercial} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="valorComercialDin" name="valorComercialDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('valorMonte' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="valorMonteDin" className="col-sm-4 col-form-label">Valor monte:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('valorMonteDin' in datos) ? datos.valorMonteDin : datos.valorMonte} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="valorMonteDin" name="valorMonteDin" placeholder="" />
                                                    </div>
                                                </div>
                                                }

                                                {
                                                ('descripcion' in datos) &&
                                                <div className="form-group row">
                                                    <label htmlFor="descripcionDin" className="col-sm-4 col-form-label">Descripción de la partida:</label>
                                                    <div className="col-sm-8">
                                                        <textarea value={('descripcionDin' in datos) ? datos.descripcionDin : datos.descripcion} onChange={this.handleInputChange} name="descripcionDin" id="descripcionDin" cols="20" rows="4" className="form-control input-sm"></textarea>
                                                    </div>
                                                </div>
                                                }
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
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <p>Observaciones de la Partida</p>
                                <div className="panel-action-icons">
                                    <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                {
                                ('estatus' in datos) &&
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="estatus" className="col-sm-4 col-form-label">Tipo de Observación:</label>
                                            <div className="col-sm-8">
                                                <select value={datos.estatus} onChange={this.handleInputChange} name="estatus" id="estatus" className="form-control input-sm">
                                                {
                                                    tiposObservacion.map(obs => <option value={obs.descripcion}>{obs.descripcion}</option>)
                                                }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }

                                {
                                ('observaciones' in datos) &&
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group row">
                                            <label htmlFor="observaciones" className="col-sm-2 col-form-label">Observaciones auditoría:</label>
                                            <div className="col-sm-10">
                                                <textarea value={datos.observaciones} onChange={this.handleInputChange} name="observaciones" id="observaciones" cols="30" rows="4" className="form-control input-sm"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
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