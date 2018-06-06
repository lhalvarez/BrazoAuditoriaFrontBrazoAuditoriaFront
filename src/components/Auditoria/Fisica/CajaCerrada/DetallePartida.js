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
      let selectsEnable = [
        'coincideDescripcion',
        'coincidePeso'
      ];

      let isSelectEnable = false;

      isSelectEnable = selectsEnable.includes(e.target.name);
      if(isSelectEnable){
        if(e.target.value === '0'){
          document.getElementById(`${e.target.name}-input`).disabled = false;
          document.getElementById(`${e.target.name}-label`).style.display = "block";
        }
        else{
          document.getElementById(`${e.target.name}-input`).disabled = true;
          document.getElementById(`${e.target.name}-input`).value = '';
          document.getElementById(`${e.target.name}-label`).style.display = "none"
        }
      }
      let switchInput = document.getElementById('requiereAperturaInput');
      if(e.target.name === 'estatus'){
        if(e.target.value !== 'C'){
          switchInput.style.display = "block";
        }else{
          switchInput.style.display = "none";
          this.setState({requiereApertura:false});
        }
      }

  }

  handleSwitchChange(e){
    this.setState({requiereApertura:e});
  }

  componentDidUpdate(){
    const { observaciones } = this.state;
    if(observaciones.length > 500){
      document.getElementById("saveButton").disabled = true;
      document.getElementById("labelObservacionesLenght").style.display = "block";

    }else{
      document.getElementById("saveButton").disabled = false;
      document.getElementById("labelObservacionesLenght").style.display = "none";

    }
  }

  handleSubmit(e){
    e.preventDefault();

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
                      <label htmlFor="sucursal" className="col-sm-4 col-form-label">Sucursal</label>
                      <div className="col-sm-8">
                        <input autoFocus="autoFocus" type="text" className="form-control input-sm" defaultValue={this.props.cajaCerrada.detallePartida.sucursal} disabled />

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="cliente" className="col-sm-4 col-form-label">Nombre de cliente</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.nombreCliente} disabled />

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="noCliente" className="col-sm-4 col-form-label">No cliente</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm" defaultValue={this.props.cajaCerrada.detallePartida.numeroCliente} disabled  />

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="nombrePv" className="col-sm-4 col-form-label">Nombre PV</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm" defaultValue={this.props.cajaCerrada.detallePartida.nombrePV} disabled  />

                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="nopv" className="col-sm-4 col-form-label">No. PV</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.numeroValuador} disabled/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="edocaja" className="col-sm-4 col-form-label">Edo caja</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.estadoCaja} disabled/>
                      </div>

                      <label htmlFor="rfid" className="col-sm-2 col-form-label">RFID</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.llavePartida.rfid} disabled/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="estado-prenda" className="col-sm-4 col-form-label">Edo Prenda</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.estadoPrenda}  disabled/>
                      </div>
                    </div>


                    <div className="form-group row">
                      <label htmlFor="tipo-contrato" className="col-sm-4 col-form-label">Tipo contrato</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.tipoContrato}  disabled/>
                      </div>
                      <label htmlFor="refrendos" className="col-sm-2 col-form-label">Refrendos</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.noRefrendos}  disabled/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="fecha-empeño" className="col-sm-4 col-form-label">Fecha empeño</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.fechaCreacion}  disabled/>
                      </div>
                      <label htmlFor="fecha-ingreso" className="col-sm-2 col-form-label">Fecha Ingreso</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.fechaIngreso}  disabled/>
                      </div>
                      <label htmlFor="fecha-modificacion" className="col-sm-4 col-form-label">Fecha Modificación</label>
                      <div className="col-sm-3">
                        <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.fechaModificacion}  disabled/>
                      </div>
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
                      <div className="col-sm-7">
                        <textarea disabled name="descripcion" id="descripcion" cols="30" rows="4" className="form-control input-sm"   >{this.props.cajaCerrada.detallePartida.descripcion}</textarea>

                      </div>
                      <label htmlFor="coincideDescripcion" className="col-sm-2 col-form-label">Coincide descripción:</label>
                      <div className="col-sm-3">
                        <select name="coincideDescripcion" id="coincideDescripcion" onChange={this.handleInputChange} className="form-control input-sm" required>
                          <option value="">Seleccione una opción</option>
                          <option value="0">No</option>
                          <option value="1">Si</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row" id="coincideDescripcion-label" hidden>
                    <div className="col-md-12">
                      <label htmlFor="descripcion" className="col-sm-2 col-form-label">Descripción:</label>
                      <div className="col-sm-5">
                        <input  type="text" name="descripcion" className="form-control input-sm" onChange={this.handleInputChange} id="coincideDescripcion-input" required disabled/>
                      </div>
                    </div>
                </div>




              </div>
            </div>
          </div>
        </div>










        <div className="row">
          <div className="col-md-12" >
            <div className="panel panel-primary" >
              <div className="panel-heading">
                <p>Detalle de la partida</p>
                <div className="panel-action-icons">
                  <i className="fa fa-eraser" onClick={this.clearForm} title="Limpiar sección"></i>
                  <i className="fa fa-toggle-up" onClick={this.toggleForm}></i>
                </div>
              </div>
              <div className="panel-body">
                <div className="col-md-6" >
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <p>Clasificación por tipo</p>
                      <div className="panel-action-icons">
                      </div>
                    </div>
                    <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label htmlFor="ramo" className="col-sm-3 col-form-label">Ramo:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.ramo}  disabled />
                        </div>
                        <label htmlFor="deposito" className="col-sm-2 col-form-label">Depósito:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.deposito}  disabled />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="subramo" className="col-sm-3 col-form-label">Sub-ramo:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.subramo}  disabled />
                        </div>

                      </div>
                      <div className="form-group row">
                        <label htmlFor="genero" className="col-sm-3 col-form-label">Género:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.genero}  disabled />
                        </div>

                      </div>
                      <div className="form-group row">
                        <label htmlFor="noserie" className="col-sm-3 col-form-label">No. Serie:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.noSerie}  disabled />
                        </div>

                      </div>
                      <div className="form-group row">
                        <label htmlFor="tipomoneda" className="col-sm-3 col-form-label">Tipo de Moneda:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.tipoMoneda}  disabled />
                        </div>
                        <label htmlFor="cantidad" className="col-sm-2 col-form-label">Cantidad:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.cantidad}  disabled />
                        </div>
                      </div>

                    </div>
                  </div>
                      <div className="panel panel-primary">
                      <div className="panel-heading">
                        <p>Calidad de metal y peso</p>
                        <div className="panel-action-icons">
                        </div>
                      </div>
                      </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label htmlFor="metal" className="col-sm-3 col-form-label">Metal:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.metal}  disabled />
                        </div>
                        <label htmlFor="peso" className="col-sm-2 col-form-label">Peso (grs):</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.gramaje}  disabled />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="kilataje" className="col-sm-3 col-form-label">Kilataje:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.kilates}  disabled />
                        </div>
                        <label htmlFor="calidad" className="col-sm-2 col-form-label">Calidad:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.calidad}  disabled />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="pesoRfid" className="col-sm-3 col-form-label">Peso RFID:</label>
                        <div className="col-sm-4">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.pesoRfid}  disabled />
                        </div>
                        <label htmlFor="pesoTotal" className="col-sm-2 col-form-label">Peso total:</label>
                        <div className="col-sm-3">
                          <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.pesoTotal} disabled  />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="coincidePeso" className="col-sm-3 col-form-label">Coincide peso:</label>
                        <div className="col-sm-9">
                          <select name="coincidePeso" id="coincidePeso" onChange={this.handleInputChange} className="form-control input-sm" required>
                            <option value="">Seleccione una opción</option>
                            <option value="0">No</option>
                            <option value="1">Si</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row" id="coincidePeso-label" hidden>
                        <label htmlFor="peso" className="col-sm-3 col-form-label">Peso:</label>
                        <div className="col-sm-9">
                          <input  type="text" name="peso" className="form-control input-sm" onChange={this.handleInputChange} id="coincidePeso-input" required disabled/>
                        </div>
                      </div>


                    </div>
                  </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="panel panel-primary panel-descripcion">
                    <div className="panel-heading">
                      <p>Valores asignados</p>
                      <div className="panel-action-icons">
                      </div>
                    </div>
                    <div className="panel-body">

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label htmlFor="prestamo" className="col-sm-3 col-form-label">Préstamo:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.prestamo} disabled />
                            </div>

                          </div>
                          <div className="form-group row">
                            <label htmlFor="prestamoMaximo" className="col-sm-3 col-form-label">Préstamo máximo:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.prestamoMaximoSugerido} disabled />
                            </div>
                            <label htmlFor="prestamoSugerido" className="col-sm-3 col-form-label">Préstamo Sugerido:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.prestamoSugerido} disabled />
                            </div>

                          </div>
                          <div className="form-group row">
                            <label htmlFor="valorMonte" className="col-sm-3 col-form-label">Valor Monte:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.valorMonte} disabled />
                            </div>
                            <label htmlFor="valorComercial" className="col-sm-3 col-form-label">Valor comercial:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.valorComercial} disabled />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="avComp" className="col-sm-3 col-form-label">Av. Comp.:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.avaluoComplementario} disabled />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="costoMetal" className="col-sm-3 col-form-label">Costo de Metal:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.costoMetal} disabled />
                            </div>
                            <label htmlFor="importeGramo" className="col-sm-3 col-form-label">Importe Gramo:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={'$ '+this.props.cajaCerrada.detallePartida.importeGramo} disabled />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-primary">
                        <div className="panel-heading">
                          <p>Estado físico</p>
                          <div className="panel-action-icons">
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label htmlFor="rango" className="col-sm-3 col-form-label">Rango:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.rango} disabled />
                            </div>
                            <label htmlFor="condicionesGenerales" className="col-sm-3 col-form-label">Condiciones Generales:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.condicionesGenerales} disabled />
                            </div>

                          </div>
                          <div className="form-group row">
                            <label htmlFor="incremento" className="col-sm-3 col-form-label">Incremento:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.incremento} disabled />
                            </div>
                            <label htmlFor="desplazamiento" className="col-sm-3 col-form-label">Desplazamiento:</label>
                            <div className="col-sm-3">
                              <input type="text" className="form-control input-sm"  defaultValue={this.props.cajaCerrada.detallePartida.desplazamientoComercial} disabled />
                            </div>

                          </div>
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
                        <select name="estatus" id="estatus" defaultValue="0" className="form-control input-sm" onChange={this.handleInputChange} required>
                        <option value="">Seleccione un estatus</option>
                          {this.props.cajaCerrada.tiposObservacion.map((campo,index)=>{
                            const {id, descripcionCorta, descripcion} = campo;
                            return <option value={descripcionCorta} key={id}> {descripcion}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" id="requiereAperturaInput" hidden>
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
                        <textarea  name="observaciones" id="observaciones" cols="30" rows="4" className="form-control input-sm" onChange={this.handleInputChange} ></textarea>
                        <p className="text-danger" id="labelObservacionesLenght" hidden>Introduzca menos de 500 caracteres</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="pull-right">
                      <button type="submit" className="btn btn-primary btn-sm" id="saveButton">Guardar</button>
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
