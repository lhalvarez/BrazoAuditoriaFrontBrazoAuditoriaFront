import React, { Component } from 'react';
import { connect } from 'react-redux';

import FotoPartida from '../FotoPartida';
import CamposParametrizables  from '../../Fotografia/Informacion/Detalle/CamposParametrizables';
import SwitchButton from '../../../../lib/utils/SwitchButton.js';

class DetallePartidaCajaCerrada extends Component{
  static propTypes = {

  };

  constructor(){
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.state = {
      coincideDescripcion:'',
      coincidePeso:'',
      descripcion:'',
      estatus:'',
      observaciones:'',
      peso:'',
      requiereApertura:false
    };
  }

  handleInputChange(e){
      const { name, value } = e.target;

      this.setState({[name]:value});
  }

  handleSwitchChange(e){
    this.setState({requiereApertura:e});
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state);
    let coincideDescripcion = this.state.coincideDescripcion === '1' ? true : false;
    let coincidePeso = this.state.coincidePeso === '1' ? true : false;

    let resultadoAuditoria = {
                "cajaAbierta": null,
                "cajaCerrada": {
                  "coincideDescripcion": coincideDescripcion,
                  "coincidePeso": coincidePeso,
                  "descripcion": this.state.descripcion,
                  "peso": this.state.peso,
                  "requiereApertura": this.state.requiereApertura
                },
                "estatus": this.state.estatus,
                "folio": this.props.cajaCerrada.llavePartida.folio,
                "idAuditoria": this.props.cajaCerrada.llavePartida.idAuditoria,
                "idResultado": null,
                "observaciones": this.state.observaciones
              }

    console.log(resultadoAuditoria);
    this.props.enviarResultado(resultadoAuditoria);
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

    $panelBody.find('input').each((index,element) => element.value = '');
  }

  render(){
    let {requiereApertura} = this.state;
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
                    <div className="form-group row">
                      <label htmlFor="sucursal" className="col-sm-4 col-form-label">Número de sucursal:</label>
                      <div className="col-sm-8">
                        <input autoFocus="autoFocus" type="text" className="form-control input-sm" defaultValue={this.props.cajaCerrada.detallePartida.sucursal} />

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="cliente" className="col-sm-4 col-form-label">Cliente:</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.nombreCliente} />

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="valuador" className="col-sm-4 col-form-label">Valuador:</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.nombrePV}/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="estado-prenda" className="col-sm-4 col-form-label">Estado de la prenda:</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.estadoPrenda} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="caja" className="col-sm-4 col-form-label">Estado de la caja:</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm" defaultValue={this.props.cajaCerrada.detallePartida.estadoCaja} />
                      </div>
                    </div>
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



        <CamposParametrizables detallePartida={this.props.cajaCerrada.detallePartida} campos={this.props.campos} toggleForm={this.toggleForm} clearForm={this.clearForm}/>

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <p>Cotejamiento de descripción</p>
                <div className="panel-action-icons">
                  <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                  <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label htmlFor="coincideDescripcion" className="col-sm-4 col-form-label">Coincide descripción:</label>
                      <div className="col-sm-8">
                        <select name="coincideDescripcion" id="coincideDescripcion" onChange={this.handleInputChange} className="form-control input-sm" required>
                          <option value="">Seleccione una opción</option>
                          <option value="0">No</option>
                          <option value="1">Si</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="coincidePeso" className="col-sm-4 col-form-label">Peso coincide:</label>
                      <div className="col-sm-8">
                        <select name="coincidePeso" id="coincidePeso" onChange={this.handleInputChange} className="form-control input-sm" required>
                          <option value="">Seleccione una opción</option>
                          <option value="0">No</option>
                          <option value="1">Si</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group row">
                      <label htmlFor="descripcion" className="col-sm-4 col-form-label">Descripción:</label>
                      <div className="col-sm-8">
                        <input  type="text" name="descripcion" className="form-control input-sm" onChange={this.handleInputChange} id="descripcion2" required />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="peso" className="col-sm-4 col-form-label">Peso:</label>
                      <div className="col-sm-8">
                        <input  type="text" name="peso" className="form-control input-sm" onChange={this.handleInputChange} id="peso" required />
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
                      <label htmlFor="estatus" className="col-sm-4 col-form-label">Estatus:</label>
                      <div className="col-sm-8">
                        <select name="estatus" id="estatus" defaultValue="0" className="form-control input-sm" onChange={this.handleInputChange} required>
                        <option value="0">Seleccione un estatus</option>
                          {this.props.cajaCerrada.tiposObservacion.map((campo,index)=>{
                            const {id, descripcionCorta, descripcion} = campo;
                            return <option value={descripcionCorta} key={id}> {descripcion}</option>;


                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label htmlFor="observacion" className="col-sm-4 col-form-label">Requiere apertura:</label>
                      <SwitchButton name="requiereApertura" checked={requiereApertura} onChange={this.handleSwitchChange}/>
                    </div>

                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group row">
                      <label htmlFor="observaciones" className="col-sm-2 col-form-label">Observaciones auditoría:</label>
                      <div className="col-sm-10">
                        <textarea name="observaciones" id="observaciones" cols="30" rows="4" className="form-control input-sm" onChange={this.handleInputChange}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="pull-right">
                      <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
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

export default (DetallePartidaCajaCerrada);
