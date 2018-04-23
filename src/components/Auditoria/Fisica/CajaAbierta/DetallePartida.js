import React, { Component } from 'react';
import { connect } from 'react-redux';

import { store } from '../../../../store';
import { enviarDetallePartida } from './actions';
import FotoPartida from '../FotoPartida';

class DetallePartidaCajaAbierta extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

        this.state = {
            partidaCargada: false,
            datos: {},
            tiposObservacion: [],
            folio: '',
            idAuditoria: 0,
            submitted: false
        };

        this.datosDinamicos = {};
        this.dinamicPropRegex = /^(.+)Din$/;

        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.stageData = this.stageData.bind(this);
  		this.renderDinamicForm = this.renderDinamicForm.bind(this);

        this.unsuscribe = store.subscribe(this.handleStoreChange);
  	}

    handleStoreChange(){
        let storeState = store.getState().cajaAbierta;

        if(storeState.partidaCargada){
            this.setState(prevState => ({ 
                partidaCargada: true,
                datos: Object.assign({},{...storeState.detallePartida},{...prevState.datos}),
                tiposObservacion: storeState.tiposObservacion,
                folio: Number(storeState.folio),
                idAuditoria: storeState.llavePartida.idAuditoria
            }));
        }
        else{
            this.setState({ 
                partidaCargada: false,
                datos: {},
                tiposObservacion: [],
                folio: '',
                idAuditoria: 0
            });
        }
    }

    handleInputChange(e){
        const { name, value } = e.target;

        this.setState(prevState => { 
            return {datos: Object.assign({},{...prevState.datos},{[name]:value})};
        });
    }

    stageData(){
        const { datos, tiposObservacion, folio, idAuditoria } = this.state;
        const { ['estatus']:estExtract, ['observaciones']:obsExtract, ...resto } = datos;

        for(let key in resto){
            if(this.dinamicPropRegex.test(key)){
                resto[this.dinamicPropRegex.exec(key)[1]] = resto[key];
                delete resto[key];
            }
        };

        return {
            cajaCerrada: null,
            estatus: datos.estatus ? datos.estatus : tiposObservacion[0].descripcionCorta,
            folio,
            idAuditoria,
            idResultado: 0,
            observaciones: datos.observaciones || '',
            cajaAbierta: resto
        };
    }

  	handleSubmit(e){
  		e.preventDefault();

        this.setState({ submitted: true });

        if(this.state.datos.observaciones){        
            let stagedData = this.stageData();
            this.setState({ submitted: false });

            this.props.enviarDetallePartida(stagedData);
        }
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
        var elementsToClear = {};

        $panelBody.find('input,textarea').each((index,element) => elementsToClear[element.name] = '');
        
        this.setState(prevState => { 
            return {datos: Object.assign({},{...prevState.datos},elementsToClear)};
        });
    }

    renderDinamicForm(readOnly = true){
        const { datos } = this.state;
        const { descripcion, ...datosDinamicos } = this.datosDinamicos;
        let fields = [];

        let labelText;
        let numericKey = 0;

        if(readOnly){
            for(let key in datosDinamicos){
                labelText = key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");

                fields.push(
                    <div key={++numericKey} className="form-group row">
                        <label htmlFor={key} className="col-sm-4 col-form-label">{labelText.charAt(0).toUpperCase() + labelText.slice(1)}:</label>
                        <div className="col-sm-8">
                            <input disabled="disabled" value={datos[key]} type="text" className="form-control input-sm" id={key} name={key} placeholder="" />
                        </div>
                    </div>
                );
            }
        }
        else{
            for(let key in datosDinamicos){
                labelText = key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");

                fields.push(
                    <div key={++numericKey} className="form-group row">
                        <label htmlFor={key+'Din'} className="col-sm-4 col-form-label">{labelText.charAt(0).toUpperCase() + labelText.slice(1)}:</label>
                        <div className="col-sm-8">
                            <input value={((key+'Din') in datos) ? datos[key+'Din'] : datos[key]} onChange={this.handleInputChange} type="text" className="form-control input-sm" id={key+'Din'} name={key+'Din'} placeholder="" />
                        </div>
                    </div>
                );
            }
        }

        return <div>{fields}</div>
    }

    componentWillUnmount(){
      this.unsuscribe();
    }

    componentWillUpdate(){
        const { datos } = this.state;
        const { 
            ['estatus']:estExt, 
            ['observaciones']:obsExt,
            ['sucursal']:sucursalExt,
            ['nombreCliente']:nombreClienteExt,
            ['numeroValuador']:numeroValuadorExt,
            ['estadoPrenda']:estadoPrendaExt,
            ['estadoCaja']:estadoCajaExt,
            ['fechaIngreso']:fechaIngresoExt,
            ['fechaCreacion']:fechaCreacionExt,
            ['fechaModificacion']:fechaModificacionExt,
            ...resto } = datos;

        for(let key in resto){
            if(this.dinamicPropRegex.test(key))
                delete resto[key];
        }

        this.datosDinamicos = resto;
    }

  	render(){
        const { partidaCargada, datos, tiposObservacion, submitted } = this.state;

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
                                                {/*<i className="fa fa-check-circle"></i>*/}
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('nombreCliente' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="nombreCliente" className="col-sm-4 col-form-label">Cliente:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.nombreCliente} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="nombreCliente" name="nombreCliente" placeholder="" />
                                                {/*<i className="fa fa-times-circle"></i>*/}
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
                                                {this.renderDinamicForm()}
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
                                                {this.renderDinamicForm(false)}
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="estatus" className="col-sm-4 col-form-label">Tipo de Observación:</label>
                                            <div className="col-sm-8">
                                                <select value={datos.estatus} onChange={this.handleInputChange} name="estatus" id="estatus" className="form-control input-sm">
                                                    <option value="">Selecciona un tipo de Observación</option>
                                                    {
                                                        tiposObservacion.map(obs => <option key={obs.id} value={obs.descripcionCorta}>{obs.descripcion}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={'form-group row'+( (submitted && !datos.observaciones) ? ' has-error' : '' )}>
                                            <label htmlFor="observaciones" className="col-sm-2 col-form-label">Observaciones auditoría:</label>
                                            <div className="col-sm-10">
                                                <textarea value={datos.observaciones} onChange={this.handleInputChange} name="observaciones" id="observaciones" cols="30" rows="4" className="form-control input-sm"></textarea>
                                                { (submitted && !datos.observaciones) && <div className="help-block">Las observaciones son requeridas</div> }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="pull-right">
                                            <button className="btn btn-primary btn-sm">Guardar</button>
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

export default connect(mapStateToProps,{enviarDetallePartida})(DetallePartidaCajaAbierta);