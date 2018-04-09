import React, { Component } from 'react';
import { connect } from 'react-redux';

import FotoPartida from '../FotoPartida';
import CamposParametrizables  from '../../Fotografia/Informacion/Detalle/CamposParametrizables'

class DetallePartidaCajaAbierta extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
  		this.clearForm = this.clearForm.bind(this);
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

        $panelBody.find('input').each((index,element) => element.value = '');
    }

  	render(){
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
                                                <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="sucursal" placeholder="" />
                                                <i className="fa fa-check-circle"></i>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="cliente" className="col-sm-4 col-form-label">Cliente:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="cliente" placeholder="" />
                                                <i className="fa fa-times-circle"></i>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="valuador" className="col-sm-4 col-form-label">Valuador:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control input-sm" id="valuador" placeholder="" />
                                            </div>
                                        </div>

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

                <CamposParametrizables campos={this.props.campos}/>



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
                              <select name="coincide-descripcion" id="coincideDescripcion" className="form-control input-sm">
                                <option value="0">No</option>
                                <option value="1">Si</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="pesoCoincide" className="col-sm-4 col-form-label">Peso coincide:</label>
                            <div className="col-sm-8">
                              <select name="pesoCoincide" id="pesoCoincide" className="form-control input-sm">
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
                              <input  type="text" className="form-control input-sm" id="descripcion"  />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="peso" className="col-sm-4 col-form-label">Peso:</label>
                            <div className="col-sm-8">
                              <input  type="text" className="form-control input-sm" id="peso"  />
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
