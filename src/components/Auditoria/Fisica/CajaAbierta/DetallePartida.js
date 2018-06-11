import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import { store } from '../../../../store';
import { enviarDetallePartida } from './actions';
import FotoPartida from '../FotoPartida';
import { PALABRAS_ACENTOS } from '../../../../constants';

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
            rfid: '',
            idAuditoria: 0,
            submitted: false
        };

        this.datosDinamicos = {};
        this.dinamicPropRegex = /^(.+)Din$/;

        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
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
                rfid: storeState.llavePartida.rfid,
                idAuditoria: storeState.llavePartida.idAuditoria
            }));
        }
        else{
            this.setState({ 
                partidaCargada: false,
                datos: {},
                tiposObservacion: [],
                folio: '',
                rfid: '',
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

    handleNumberChange(e){
        const { name, value } = e.target;

        let castValue = Number(value.replace(/\,/g,''));

        this.setState(prevState => { 
            return {datos: Object.assign({},{...prevState.datos},{[name]:castValue})};
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
            estatus: datos.estatus,
            folio,
            idAuditoria,
            idResultado: 0,
            observaciones: datos.observaciones,
            cajaAbierta: resto
        };
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({ submitted: true });

        if(Boolean(this.state.datos.observaciones) && Boolean(this.state.datos.estatus) && (this.state.datos.observaciones.length <= 500)){        
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

        let moneyFields = [
            'prestamo',
            'prestamoMaximoSugerido',
            'prestamoSugerido',
            'valorComercial',
            'valorMonte'
        ];
        let isMoneyField = false;

        let labelText,formatText,finalText;
        let numericKey = 0;

        if(readOnly){
            for(let key in datosDinamicos){
                finalText = '';
                isMoneyField = moneyFields.includes(key);
                labelText = key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
                formatText = labelText.charAt(0).toUpperCase() + labelText.slice(1);

                (formatText.split(' ')).forEach(element => finalText += ((finalText ? ' ' : '') + ( (element in PALABRAS_ACENTOS) ? PALABRAS_ACENTOS[element] : element )));

                fields.push(
                    <div key={++numericKey} className="form-group row">
                        <label htmlFor={key} className="col-sm-4 col-form-label">{finalText}:</label>
                        <div className="col-sm-8">
                            {
                                isMoneyField ?
                                <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <NumberFormat disabled="disabled" value={datos[key]} className="form-control input-sm" id={key} name={key} thousandSeparator={true} />
                                </div>
                                :
                                <input disabled="disabled" value={datos[key]} type="text" className="form-control input-sm" id={key} name={key} />
                            }
                        </div>
                    </div>
                );
            }
        }
        else{
            for(let key in datosDinamicos){
                finalText = '';
                isMoneyField = moneyFields.includes(key);
                labelText = key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
                formatText = labelText.charAt(0).toUpperCase() + labelText.slice(1);

                (formatText.split(' ')).forEach(element => finalText += ((finalText ? ' ' : '') + ( (element in PALABRAS_ACENTOS) ? PALABRAS_ACENTOS[element] : element )));

                fields.push(
                    <div key={++numericKey} className="form-group row">
                        <label htmlFor={key+'Din'} className="col-sm-4 col-form-label">{finalText}:</label>
                        <div className="col-sm-8">
                            {
                                isMoneyField ?
                                <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <NumberFormat value={((key+'Din') in datos) ? datos[key+'Din'] : datos[key]} onChange={this.handleNumberChange} className="form-control input-sm" id={key+'Din'} name={key+'Din'} thousandSeparator={true} />
                                </div>
                                :
                                <input value={((key+'Din') in datos) ? datos[key+'Din'] : datos[key]} onChange={this.handleInputChange} type="text" className="form-control input-sm" id={key+'Din'} name={key+'Din'} />
                            }
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
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        {
                                        ('sucursal' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="sucursal" className="col-sm-4 col-form-label">Sucursal:</label>
                                            <div className="col-sm-8">
                                                <input disabled="disabled" value={datos.sucursal} type="text" className="form-control input-sm" id="sucursal" name="sucursal" placeholder="" />
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('nombreCliente' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="nombreCliente" className="col-sm-4 col-form-label">Nombre de cliente:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.nombreCliente} disabled="disabled" type="text" className="form-control input-sm" id="nombreCliente" name="nombreCliente" placeholder="" />
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('numeroCliente' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="numeroCliente" className="col-sm-4 col-form-label">Número de cliente:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.numeroCliente} disabled="disabled" type="text" className="form-control input-sm" id="numeroCliente" name="numeroCliente" placeholder="" />
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('nombrePV' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="nombrePV" className="col-sm-4 col-form-label">Nombre PV:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.nombrePV} disabled="disabled" type="text" className="form-control input-sm" id="nombrePV" name="nombrePV" placeholder="" />
                                            </div>
                                        </div>
                                        }

                                        {
                                        ('numeroValuador' in datos) && 
                                        <div className="form-group row">
                                            <label htmlFor="numeroValuador" className="col-sm-4 col-form-label">Número de valuador:</label>
                                            <div className="col-sm-8">
                                                <input value={datos.numeroValuador} disabled="disabled" type="text" className="form-control input-sm" id="numeroValuador" name="numeroValuador" placeholder="" />
                                            </div>
                                        </div>
                                        }
                                        <div className="col-md-6">
                                            {
                                            ('estadoCaja' in datos) && 
                                            <div className="form-group row">
                                                <label htmlFor="estadoCaja" className="col-sm-5 col-form-label">Edo caja:</label>
                                                <div className="col-sm-7">
                                                    <input value={datos.estadoCaja} disabled="disabled" type="text" className="form-control input-sm" id="estadoCaja" name="estadoCaja" placeholder="" />
                                                </div>
                                            </div>
                                            }
                                            {
                                            ('estadoPrenda' in datos) && 
                                            <div className="form-group row">
                                                <label htmlFor="estadoPrenda" className="col-sm-5 col-form-label">Edo prenda:</label>
                                                <div className="col-sm-7">
                                                    <input value={datos.estadoPrenda} disabled="disabled" type="text" className="form-control input-sm" id="estadoPrenda" name="estadoPrenda" placeholder="" />
                                                </div>
                                            </div>
                                            }
                                            {
                                            ('tipoContrato' in datos) && 
                                            <div className="form-group row">
                                                <label htmlFor="tipoContrato" className="col-sm-5 col-form-label">Tipo contrato:</label>
                                                <div className="col-sm-7">
                                                    <input value={datos.tipoContrato} disabled="disabled" type="text" className="form-control input-sm" id="tipoContrato" name="tipoContrato" placeholder="" />
                                                </div>
                                            </div>
                                            }
                                            {
                                            ('fechaCreacion' in datos) && 
                                            <div className="form-group row">
                                                <label htmlFor="fechaCreacion" className="col-sm-5 col-form-label">Fecha empeño:</label>
                                                <div className="col-sm-7">
                                                    <input value={datos.fechaCreacion} disabled="disabled" type="text" className="form-control input-sm" id="fechaCreacion" name="fechaCreacion" placeholder="" />
                                                </div>
                                            </div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            { 
                                            <div className="form-group row">
                                                <label htmlFor="this.state.rfid" className="col-sm-5 col-form-label">RFID:</label>
                                                <div className="col-sm-7">
                                                    <input value={this.state.rfid} disabled="disabled" type="text" className="form-control input-sm" id="rfid" name="rfid" placeholder="" />
                                                </div>
                                            </div>
                                            }
                                            {
                                            ('noRefrendos' in datos) && 
                                            <div className="form-group row">
                                                <label htmlFor="noRefrendos" className="col-sm-5 col-form-label">Refrendos:</label>
                                                <div className="col-sm-7">
                                                    <input value={datos.noRefrendos} disabled="disabled" type="text" className="form-control input-sm" id="noRefrendos" name="noRefrendos" placeholder="" />
                                                </div>
                                            </div>
                                            }
                                            {
                                            ('fechaIngreso' in datos) && 
                                            <div className="form-group row">
                                                <label htmlFor="fechaIngreso" className="col-sm-5 col-form-label">Fecha ingreso:</label>
                                                <div className="col-sm-7">
                                                    <input value={datos.fechaIngreso} disabled="disabled" type="text" className="form-control input-sm" id="fechaIngreso" name="fechaIngreso" placeholder="" />
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-info panel-photo">
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
                    <div className="col-md-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <p>Descripción de la Partida</p>
                                <div className="panel-action-icons">
                                    <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        {
                                        ('descripcion' in datos) &&
                                        <div className="form-group">
                                            <textarea value={datos.descripcion} onChange={this.handleInputChange} name="descripcion" id="descripcion" cols="20" rows="4" className="form-control input-sm"></textarea>
                                        </div>
                                        }
                                    </div>
                                </div>
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
                                        <fieldset>
                                            <legend>Clasificación por tipo</legend>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('ramo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="ramo" className="col-sm-4 col-form-label">Ramo:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.ramo} disabled="disabled" type="text" className="form-control input-sm" id="ramo" name="ramo" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('subramo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="subramo" className="col-sm-4 col-form-label">Subramo:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.subramo} disabled="disabled" type="text" className="form-control input-sm" id="subramo" name="subramo" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('deposito' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="deposito" className="col-sm-4 col-form-label">Depósito:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.deposito} disabled="disabled" type="text" className="form-control input-sm" id="deposito" name="deposito" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('genero' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="genero" className="col-sm-4 col-form-label">Género:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.genero} disabled="disabled" type="text" className="form-control input-sm" id="genero" name="genero" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('noSerie' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="noSerie" className="col-sm-4 col-form-label">No. Serie:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.noSerie} disabled="disabled" type="text" className="form-control input-sm" id="noSerie" name="noSerie" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('tipoMoneda' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="tipoMoneda" className="col-sm-4 col-form-label">Tipo de Moneda:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.tipoMoneda} disabled="disabled" type="text" className="form-control input-sm" id="tipoMoneda" name="tipoMoneda" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('catidad' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="catidad" className="col-sm-4 col-form-label">Cantidad:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.catidad} disabled="disabled" type="text" className="form-control input-sm" id="catidad" name="catidad" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Calidad de metal y peso</legend>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('metal' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="metal" className="col-sm-4 col-form-label">Metal:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.metal} disabled="disabled" type="text" className="form-control input-sm" id="metal" name="metal" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('kilates' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="kilates" className="col-sm-4 col-form-label">Kilataje:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.kilates} disabled="disabled" type="text" className="form-control input-sm" id="kilates" name="kilates" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('gramaje' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="gramaje" className="col-sm-4 col-form-label">Gramaje:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.gramaje} disabled="disabled" type="text" className="form-control input-sm" id="gramaje" name="gramaje" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('calidadOro' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="calidadOro" className="col-sm-4 col-form-label">Calidad:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.calidadOro} disabled="disabled" type="text" className="form-control input-sm" id="calidadOro" name="calidadOro" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Estado físico</legend>
                                            <div className="row">
                                                <div className="col-md-6">
                                                {
                                                ('rango' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="rango" className="col-sm-4 col-form-label">Rango:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.rango} disabled="disabled" type="text" className="form-control input-sm" id="rango" name="rango" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('incremento' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="incremento" className="col-sm-4 col-form-label">Incremento:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.incremento} disabled="disabled" type="text" className="form-control input-sm" id="incremento" name="incremento" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-6">
                                                {
                                                ('condicionesGenerales' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="condicionesGenerales" className="col-sm-4 col-form-label">Condiciones Generales:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.condicionesGenerales} disabled="disabled" type="text" className="form-control input-sm" id="condicionesGenerales" name="condicionesGenerales" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('desplazamientoComercial' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="desplazamientoComercial" className="col-sm-4 col-form-label">Desplazamiento:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.desplazamientoComercial} disabled="disabled" type="text" className="form-control input-sm" id="desplazamientoComercial" name="desplazamientoComercial" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Valores asignados</legend>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('prestamo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="prestamo" className="col-sm-4 col-form-label">Préstamo:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat disabled="disabled" value={datos.prestamo} className="form-control input-sm" id="prestamo" name="prestamo" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('prestamoMaximoSugerido' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="prestamoMaximoSugerido" className="col-sm-4 col-form-label">Préstamo Máximo Sugerido:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat disabled="disabled" value={datos.prestamoMaximoSugerido} className="form-control input-sm" id="prestamoMaximoSugerido" name="prestamoMaximoSugerido" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('prestamoSugerido' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="prestamoSugerido" className="col-sm-4 col-form-label">Préstamo Sugerido:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat disabled="disabled" value={datos.prestamoSugerido} className="form-control input-sm" id="prestamoSugerido" name="prestamoSugerido" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('valorMonte' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="valorMonte" className="col-sm-4 col-form-label">Valor Monte:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat disabled="disabled" value={datos.valorMonte} className="form-control input-sm" id="valorMonte" name="valorMonte" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('avaluoComplementario' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="avaluoComplementario" className="col-sm-4 col-form-label">Av. Comp:</label>
                                                    <div className="col-sm-8">
                                                        <input value={datos.avaluoComplementario} disabled="disabled" type="text" className="form-control input-sm" id="avaluoComplementario" name="avaluoComplementario" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('valorComercial' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="valorComercial" className="col-sm-4 col-form-label">Valor Comercial:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat disabled="disabled" value={datos.valorComercial} className="form-control input-sm" id="valorComercial" name="valorComercial" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('costoMetal' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="costoMetal" className="col-sm-4 col-form-label">Costo de metal:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat disabled="disabled" value={datos.costoMetal} className="form-control input-sm" id="costoMetal" name="costoMetal" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('importeGramo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="importeGramo" className="col-sm-4 col-form-label">Importe Gramo:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat disabled="disabled" value={datos.importeGramo} className="form-control input-sm" id="importeGramo" name="importeGramo" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <p>Validación de Auditoría</p>
                                <div className="panel-action-icons">
                                    <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <fieldset>
                                            <legend>Clasificación por tipo</legend>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('ramo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="ramoDin" className="col-sm-4 col-form-label">Ramo:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('ramoDin' in datos) ? datos['ramoDin'] : datos['ramo']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="ramoDin" name="ramoDin" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('subramo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="subramoDin" className="col-sm-4 col-form-label">Subramo:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('subramoDin' in datos) ? datos['subramoDin'] : datos['subramo']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="subramoDin" name="subramoDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('deposito' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="depositoDin" className="col-sm-4 col-form-label">Depósito:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('depositoDin' in datos) ? datos['depositoDin'] : datos['deposito']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="depositoDin" name="depositoDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('genero' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="generoDin" className="col-sm-4 col-form-label">Género:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('generoDin' in datos) ? datos['generoDin'] : datos['genero']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="generoDin" name="generoDin" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('noSerie' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="noSerieDin" className="col-sm-4 col-form-label">No. Serie:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('noSerieDin' in datos) ? datos['noSerieDin'] : datos['noSerie']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="noSerieDin" name="noSerieDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('tipoMoneda' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="tipoMonedaDin" className="col-sm-4 col-form-label">Tipo de Moneda:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('tipoMonedaDin' in datos) ? datos['tipoMonedaDin'] : datos['tipoMoneda']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="tipoMonedaDin" name="tipoMonedaDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('catidad' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="catidadDin" className="col-sm-4 col-form-label">Cantidad:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('catidadDin' in datos) ? datos['catidadDin'] : datos['catidad']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="catidadDin" name="catidadDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Calidad de metal y peso</legend>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('metal' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="metalDin" className="col-sm-4 col-form-label">Metal:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('metalDin' in datos) ? datos['metalDin'] : datos['metal']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="metalDin" name="metalDin" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('kilates' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="kilatesDin" className="col-sm-4 col-form-label">Kilataje:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('kilatesDin' in datos) ? datos['kilatesDin'] : datos['kilates']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="kilatesDin" name="kilatesDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('gramaje' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="gramajeDin" className="col-sm-4 col-form-label">Gramaje:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('gramajeDin' in datos) ? datos['gramajeDin'] : datos['gramaje']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="gramajeDin" name="gramajeDin" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('calidadOro' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="calidadOro" className="col-sm-4 col-form-label">Calidad:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('calidadOroDin' in datos) ? datos['calidadOroDin'] : datos['calidadOro']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="calidadOroDin" name="calidadOroDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Estado físico</legend>
                                            <div className="row">
                                                <div className="col-md-6">
                                                {
                                                ('rango' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="rangoDin" className="col-sm-4 col-form-label">Rango:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('rangoDin' in datos) ? datos['rangoDin'] : datos['rango']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="rangoDin" name="rangoDin" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('incremento' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="incremento" className="col-sm-4 col-form-label">Incremento:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('incrementoDin' in datos) ? datos['incrementoDin'] : datos['incremento']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="incrementoDin" name="incrementoDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-6">
                                                {
                                                ('condicionesGenerales' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="condicionesGeneralesDin" className="col-sm-4 col-form-label">Condiciones Generales:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('condicionesGeneralesDin' in datos) ? datos['condicionesGeneralesDin'] : datos['condicionesGenerales']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="condicionesGeneralesDin" name="condicionesGeneralesDin" />
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('desplazamientoComercial' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="desplazamientoComercial" className="col-sm-4 col-form-label">Desplazamiento:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('desplazamientoComercialDin' in datos) ? datos['desplazamientoComercialDin'] : datos['desplazamientoComercial']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="desplazamientoComercialDin" name="desplazamientoComercialDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Valores asignados</legend>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('prestamo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="prestamoDin" className="col-sm-4 col-form-label">Préstamo:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat value={(('prestamoDin') in datos) ? datos['prestamoDin'] : datos['prestamo']} onChange={this.handleNumberChange} className="form-control input-sm" id="prestamoDin" name="prestamoDin" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('prestamoMaximoSugerido' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="prestamoMaximoSugeridoDin" className="col-sm-4 col-form-label">Préstamo Máximo Sugerido:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat value={(('prestamoMaximoSugeridoDin') in datos) ? datos['prestamoMaximoSugeridoDin'] : datos['prestamoMaximoSugerido']} onChange={this.handleNumberChange} className="form-control input-sm" id="prestamoMaximoSugeridoDin" name="prestamoMaximoSugeridoDin" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('prestamoSugerido' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="prestamoSugeridoDin" className="col-sm-4 col-form-label">Préstamo Sugerido:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat value={(('prestamoSugeridoDin') in datos) ? datos['prestamoSugeridoDin'] : datos['prestamoSugerido']} onChange={this.handleNumberChange} className="form-control input-sm" id="prestamoSugeridoDin" name="prestamoSugeridoDin" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('valorMonte' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="valorMonteDin" className="col-sm-4 col-form-label">Valor Monte:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat value={(('valorMonteDin') in datos) ? datos['valorMonteDin'] : datos['valorMonte']} onChange={this.handleNumberChange} className="form-control input-sm" id="valorMonteDin" name="valorMonteDin" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                {
                                                ('avaluoComplementario' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="avaluoComplementarioDin" className="col-sm-4 col-form-label">Av. Comp:</label>
                                                    <div className="col-sm-8">
                                                        <input value={('avaluoComplementarioDin' in datos) ? datos['avaluoComplementarioDin'] : datos['avaluoComplementario']} onChange={this.handleInputChange} type="text" className="form-control input-sm" id="avaluoComplementarioDin" name="avaluoComplementarioDin" />
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('valorComercial' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="valorComercialDin" className="col-sm-4 col-form-label">Valor Comercial:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat value={(('valorComercialDin') in datos) ? datos['valorComercialDin'] : datos['valorComercial']} onChange={this.handleNumberChange} className="form-control input-sm" id="valorComercialDin" name="valorComercialDin" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-7">
                                                {
                                                ('costoMetal' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="costoMetalDin" className="col-sm-4 col-form-label">Costo de metal:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat value={(('costoMetalDin') in datos) ? datos['costoMetalDin'] : datos['costoMetal']} onChange={this.handleNumberChange} className="form-control input-sm" id="costoMetalDin" name="costoMetalDin" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                                <div className="col-md-5">
                                                {
                                                ('importeGramo' in datos) && 
                                                <div className="form-group row">
                                                    <label htmlFor="importeGramoDin" className="col-sm-4 col-form-label">Importe Gramo:</label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">$</span>
                                                            <NumberFormat value={(('importeGramoDin') in datos) ? datos['importeGramoDin'] : datos['importeGramo']} onChange={this.handleNumberChange} className="form-control input-sm" id="importeGramoDin" name="importeGramoDin" thousandSeparator={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            </div>
                                        </fieldset>
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
                                        <div className={'form-group row'+( (submitted && !datos.estatus) ? ' has-error' : '' )}>
                                            <label htmlFor="estatus" className="col-sm-4 col-form-label">Tipo de Observación:</label>
                                            <div className="col-sm-8">
                                                <select value={datos.estatus} onChange={this.handleInputChange} name="estatus" id="estatus" className="form-control input-sm">
                                                    <option value="">Seleccione un tipo de Observación</option>
                                                    {
                                                        tiposObservacion.map(obs => <option key={obs.id} value={obs.descripcionCorta}>{obs.descripcion}</option>)
                                                    }
                                                </select>
                                                { (submitted && !datos.estatus) && <div className="help-block">El tipo de observación es requerido</div> }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={'form-group row'+( (submitted && (!datos.observaciones || (datos.observaciones.length > 500))) ? ' has-error' : '' )}>
                                            <label htmlFor="observaciones" className="col-sm-2 col-form-label">Observaciones auditoría:</label>
                                            <div className="col-sm-10">
                                                <textarea value={datos.observaciones} onChange={this.handleInputChange} name="observaciones" id="observaciones" cols="30" rows="4" className="form-control input-sm"></textarea>
                                                { (submitted && !datos.observaciones) && <div className="help-block">Las observaciones son requeridas</div> }
                                                { (submitted && datos.observaciones && (datos.observaciones.length > 500)) && <div className="help-block">Las observaciones no pueden ser mayores a 500 caracteres</div> }
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