import React, {Component} from 'react';

import FotoPartida from '../../../Fisica/FotoPartida';
import CamposParametrizables  from './CamposParametrizables'


class Formulario extends Component {

  constructor(props){
    super(props);
    this.toggleForm = this.toggleForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.fillForm = this.fillForm.bind(this);


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

  fillForm(){
    let partida = this.props.detallePartida;
    if(partida){
      $('#folio').val(partida.llavePartida.folio);
      $('#ubicacion').val();
      $('#estadoCaja').val(partida.detallePartida.estadoCaja);
      $('#sucursal').val(partida.detallePartida.sucursal);
      $('#estadoPrenda').val(partida.detallePartida.estadoPrenda);
    }

    let valEstadoAudit = this.props.catEstadoAuditoria.registros;
    if(valEstadoAudit){
      valEstadoAudit.map((campo,index)=>{
        const {id, descripcionCorta, descripcion} = campo;
        $('#estatus').append($('<option>', {value: id,text: descripcionCorta+' | '+descripcion}));
      });
    }
  }


  render(){
    if(typeof this.props.detallePartida.llavePartida !== 'undefined' ){
      this.fillForm();
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row" style={{display:'flex'}}>
            <div className="col-md-6" style={{alignItems: 'stretch', display: 'flex'}}>
              <div className="panel panel-primary" style={{width:'100%'}}>
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
                        <label htmlFor="folio" className="col-sm-3 col-form-label">No de prenda:</label>
                        <div className="col-sm-3">

                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="folio"/>
                        </div>
                        <label htmlFor="ubicacion" className="col-sm-3 col-form-label">Ubicación:</label>
                        <div className="col-sm-3">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="ubicacion" placeholder="" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="estadoCaja" className="col-sm-3 col-form-label">Estado Caja:</label>
                        <div className="col-sm-3">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="estadoCaja" placeholder="" />
                        </div>
                        <label htmlFor="sucursal" className="col-sm-3 col-form-label">No. Sucursal:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm" id="sucursal" placeholder="" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="estadoPrenda" className="col-sm-3 col-form-label">Estado Prenda:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm" id="estadoPrenda" placeholder="" />
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

            <CamposParametrizables campos={this.props.campos} toggleForm={this.toggleForm} clearForm={this.clearForm}/>

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
