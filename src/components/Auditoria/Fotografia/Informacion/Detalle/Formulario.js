import React, {Component} from 'react';

import FotoPartida from '../../../Fisica/CajaAbierta/FotoPartida';
import CamposParametrizables  from './CamposParametrizables'


class Formulario extends Component {


  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <p>Datos Generales</p>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label htmlFor="sucursal" className="col-sm-3 col-form-label">No de prenda:</label>
                        <div className="col-sm-3">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="sucursal" placeholder="" />
                        </div>
                        <label htmlFor="sucursal" className="col-sm-3 col-form-label">Ubicación:</label>
                        <div className="col-sm-3">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="sucursal" placeholder="" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="sucursal" className="col-sm-3 col-form-label">Estado Caja:</label>
                        <div className="col-sm-3">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="sucursal" placeholder="" />
                        </div>
                        <label htmlFor="cliente" className="col-sm-3 col-form-label">No. Sucursal:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm" id="cliente" placeholder="" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="cliente" className="col-sm-3 col-form-label">Estado Prenda:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm" id="cliente" placeholder="" />
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
                </div>
                <div className="panel-body">
                  <FotoPartida />
                </div>
              </div>
            </div>
          </div>

            <CamposParametrizables campos={this.props.campos}/>

          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <p>Observaciones de la Partida</p>
                  <div className="panel-action-icons">
                    <i className="fa fa-eraser"></i>
                    <i className="fa fa-toggle-up"></i>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label htmlFor="estatus" className="col-sm-4 col-form-label">Estatus:</label>
                        <div className="col-sm-8">
                          <select name="coincide-descripcion" id="estatus" className="form-control input-sm"></select>
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
      </div>
    );
  }
}


export default Formulario;
