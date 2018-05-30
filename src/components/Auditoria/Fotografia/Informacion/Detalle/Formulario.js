import React, {Component} from 'react';

import FotoPartida from '../../../Fisica/FotoPartida';
import CamposParametrizables  from './CamposParametrizables';

import {LEYENDAS} from '../../../../../constants/index.js'
import {connect} from "react-redux";
import {enviarDetallePartida, getCatEstadoAuditoria, getPartidaDetail} from "./actions";



class Formulario extends Component {

  constructor(props){
    super(props);
    this.toggleForm = this.toggleForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.SelectObservaciones = this.SelectObservaciones.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      detallePartida:this.props.detallePartida,
      resultadoAuditoria:this.props.detallePartida.resultado
    }


  }


  handleSubmit(e){
    e.preventDefault();

    var estatusResultadoAuditoria = $('#estatus').val();
    let observacionesResultadoAuditoria = $('#observaciones').val();
    let partida = this.props.detallePartida;
    let folio = 0;
    let idAuditoria = 0;
    if(partida){
      folio = partida.llavePartida.folio;
      idAuditoria = partida.llavePartida.idAuditoria;
    }
    let resultadoAuditoria = {
      "cajaAbierta": null,
      "cajaCerrada": null,
      "estatus": estatusResultadoAuditoria,
      "folio": folio,
      "idAuditoria": idAuditoria,
      "idResultado": 0,
      "observaciones": observacionesResultadoAuditoria
    };

    this.props.enviarDetallePartida(resultadoAuditoria);  

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

  SelectObservaciones(){
    let cataologoEstadoAuditoria = this.props.cataologoEstadoAuditoria.registros;
    if(cataologoEstadoAuditoria){
      return <select name="estatus" id="estatus" className="form-control input-sm">
        <option value="">Seleccione un tipo de Observación</option>
        {
          cataologoEstadoAuditoria.map(obs => <option key={obs.id} value={obs.descripcionCorta}>{obs.descripcion}</option>)
        }
      </select>;
    }else{
      return <div></div>
    }

  }


  render(){
    const llavePartida = this.props.objetoPartida.llavePartida;
    const detallePartida = this.props.objetoPartida.detallePartida;
    const resultadoAuditoria = this.props.objetoPartida.resultado;
    return(
      <div>
        { resultadoAuditoria ? <div className="alert alert-warning auditoriaEfectuada">
          <b>{LEYENDAS.VALIDACION.AUDITORIA_EFECTUADA}</b>
        </div> : null}
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

                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="folio" value={llavePartida? llavePartida.folio : ''}/>
                        </div>
                        <label htmlFor="ubicacion" className="col-sm-3 col-form-label">Ubicación:</label>
                        <div className="col-sm-3">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="ubicacion" placeholder="" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="estadoCaja" className="col-sm-3 col-form-label">Estado Caja:</label>
                        <div className="col-sm-3">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" id="estadoCaja" value={detallePartida? detallePartida.estadoCaja:''} />
                        </div>
                        <label htmlFor="sucursal" className="col-sm-3 col-form-label">No. Sucursal:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm" id="sucursal" value={detallePartida? detallePartida.sucursal : ''} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="estadoPrenda" className="col-sm-3 col-form-label">Estado Prenda:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm" id="estadoPrenda" value={detallePartida? detallePartida.estadoPrenda : ''} />
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

          <CamposParametrizables detallePartida={this.props.detallePartida.detallePartida} toggleForm={this.toggleForm} clearForm={this.clearForm}/>

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
                          {resultadoAuditoria? <b className="estatusText">{resultadoAuditoria.estatus}</b> : <this.SelectObservaciones /> }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group row">
                        <label htmlFor="observacion-auditoria" className="col-sm-2 col-form-label">Observaciones auditoría:</label>
                        <div className="col-sm-10">
                          {resultadoAuditoria? <textarea name="" id="observaciones" cols="30" rows="4" className="form-control input-sm " value={resultadoAuditoria.observaciones}></textarea> :
                            <textarea name="" id="observaciones" cols="30" rows="4" className="form-control input-sm "></textarea>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  <div className="row">
                    <div className="col-sm-12">
                      { resultadoAuditoria ? null : <div className="pull-right">
                        <button type="submit" className="btn btn-primary btn-sm" >Guardar</button>
                      </div> }
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


function mapStateToProps(state) {
  return {
    objetoPartida: state.detallePartida.detallePartida,
    cataologoEstadoAuditoria: state.detallePartida.catalogoestadoAuditoria
  }
}
export default connect(mapStateToProps)(Formulario);
