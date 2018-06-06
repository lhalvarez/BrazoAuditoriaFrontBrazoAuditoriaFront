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
                        <label htmlFor="sucursal" className="col-sm-4 col-form-label">Sucursal</label>
                        <div className="col-sm-8">
                          <input autoFocus="autoFocus" type="text" className="form-control input-sm" value={detallePartida? detallePartida.sucursal : '' } disabled />

                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="cliente" className="col-sm-4 col-form-label">Nombre de cliente</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.nombreCliente:''} disabled />

                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="noCliente" className="col-sm-4 col-form-label">No cliente</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control input-sm" value={detallePartida? detallePartida.numeroCliente:''} disabled  />

                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="nombrePv" className="col-sm-4 col-form-label">Nombre PV</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control input-sm" value={detallePartida? detallePartida.nombrePV:''} disabled  />

                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="nopv" className="col-sm-4 col-form-label">No. PV</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.numeroValuador:''} disabled/>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="edocaja" className="col-sm-4 col-form-label">Edo caja</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.estadoCaja:''} disabled/>
                        </div>

                        <label htmlFor="rfid" className="col-sm-2 col-form-label">RFID</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  value={llavePartida? llavePartida.rfid:''} disabled/>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="estado-prenda" className="col-sm-4 col-form-label">Edo Prenda</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.estadoPrenda:''}  disabled/>
                        </div>
                      </div>


                      <div className="form-group row">
                        <label htmlFor="tipo-contrato" className="col-sm-4 col-form-label">Tipo contrato</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.tipoContrato:''}  disabled/>
                        </div>
                        <label htmlFor="refrendos" className="col-sm-2 col-form-label">Refrendos</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.noRefrendos:''}  disabled/>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="fecha-empeño" className="col-sm-4 col-form-label">Fecha empeño</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.fechaCreacion:''}  disabled/>
                        </div>
                        <label htmlFor="fecha-ingreso" className="col-sm-2 col-form-label">Fecha Ingreso</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.fechaIngreso:''}  disabled/>
                        </div>
                        <label htmlFor="fecha-modificacion" className="col-sm-4 col-form-label">Fecha empeño</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.fechaModificacion:''}  disabled/>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="caja" className="col-sm-4 col-form-label">Estado de la caja</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control input-sm" value={detallePartida? detallePartida.estadoCaja:''}  disabled/>
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

          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <p>Descripción de la partida</p>
                  <div className="panel-action-icons">
                    <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea disabled name="descripcion" id="descripcion" cols="30" rows="4" className="form-control input-sm"   >{detallePartida? detallePartida.descripcion:''}</textarea>

                        </div>

                      </div>
                    </div>
                  </div>





                </div>
              </div>
            </div>
          </div>



          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <p>Detalle de la partida</p>
                  <div className="panel-action-icons">
                    <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                    <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="col-md-6">
                    <h5>Clasificación por tipo</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label htmlFor="ramo" className="col-sm-4 col-form-label">Ramo:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.ramo:''}  disabled />
                          </div>
                          <label htmlFor="deposito" className="col-sm-2 col-form-label">Depósito:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.deposito:''}  disabled />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="subramo" className="col-sm-4 col-form-label">Sub-ramo:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.subramo:''}  disabled />
                          </div>

                        </div>
                        <div className="form-group row">
                          <label htmlFor="genero" className="col-sm-4 col-form-label">Género:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.genero:''}  disabled />
                          </div>

                        </div>
                        <div className="form-group row">
                          <label htmlFor="noserie" className="col-sm-4 col-form-label">No. Serie:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.noSerie:''}  disabled />
                          </div>

                        </div>
                        <div className="form-group row">
                          <label htmlFor="tipomoneda" className="col-sm-4 col-form-label">Tipo de Moneda:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.tipoMoneda:''}  disabled />
                          </div>
                          <label htmlFor="cantidad" className="col-sm-2 col-form-label">Cantidad:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.cantidad:''}  disabled />
                          </div>
                        </div>

                      </div>
                    </div>
                    <h5>Calidad de metal y peso</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label htmlFor="metal" className="col-sm-4 col-form-label">Metal:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.metal:''}  disabled />
                          </div>
                          <label htmlFor="peso" className="col-sm-2 col-form-label">Peso (grs):</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.gramaje:''}  disabled />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="kilataje" className="col-sm-4 col-form-label">Kilataje:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.kilates:''}  disabled />
                          </div>
                          <label htmlFor="calidad" className="col-sm-2 col-form-label">Calidad:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.calidad:''}  disabled />
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h5>Valores asignados</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label htmlFor="prestamo" className="col-sm-4 col-form-label">Préstamo:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.prestamo:''} disabled />
                          </div>

                        </div>
                        <div className="form-group row">
                          <label htmlFor="prestamoMaximo" className="col-sm-4 col-form-label">Préstamo máximo:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.prestamoMaximoSugerido:''} disabled />
                          </div>
                          <label htmlFor="prestamoSugerido" className="col-sm-2 col-form-label">Préstamo Sugerido:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.prestamoSugerido:''} disabled />
                          </div>

                        </div>
                        <div className="form-group row">
                          <label htmlFor="valorMonte" className="col-sm-4 col-form-label">Valor Monte:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.valorMonte:''} disabled />
                          </div>
                          <label htmlFor="valorComercial" className="col-sm-2 col-form-label">Valor comercial:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.valorComercial:''} disabled />
                          </div>
                          <label htmlFor="avComp" className="col-sm-4 col-form-label">Av. Comp.:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.avaluoComplementario:''} disabled />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="costoMetal" className="col-sm-4 col-form-label">Costo de Metal:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.costoMetal:''} disabled />
                          </div>
                          <label htmlFor="importeGramo" className="col-sm-2 col-form-label">Importe Gramo:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? '$ '+detallePartida.importeGramo:''} disabled />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5>Estado físico</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label htmlFor="rango" className="col-sm-4 col-form-label">Rango:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.rango:''} disabled />
                          </div>
                          <label htmlFor="condicionesGenerales" className="col-sm-2 col-form-label">Condiciones Generales:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.condicionesGenerales:''} disabled />
                          </div>

                        </div>
                        <div className="form-group row">
                          <label htmlFor="incremento" className="col-sm-4 col-form-label">Incremento:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.incremento:''} disabled />
                          </div>
                          <label htmlFor="desplazamiento" className="col-sm-2 col-form-label">Desplazamiento:</label>
                          <div className="col-sm-3">
                            <input type="text" className="form-control input-sm"  value={detallePartida? detallePartida.desplazamientoComercial:''} disabled />
                          </div>

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
