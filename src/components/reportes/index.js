

/*
 *
 *
 *
 * <p><a href="https://wiki.quarksoft.net/display/Auditoria/Home">Auditoria - Backend</a></p>
 *
 * <p><b><a href="https://quarksoft.net/">Quarksoft S.A.P.I. de C.V. Copyrigth © 2018</a></b></p>
 *
 *
 */


import React, {Component} from 'react';

import Encabezado from './componentes/encabezado';
import SelectorReporte from './componentes/selector-reporte';
import SelectorFormato from './componentes/selector-formato';
import SelectorFecha from  './componentes/selector-fecha';

import {TITLES} from '../../constants/index';


// function eventSubmit(e, props) {
//   e.preventDefault();
//   let element = e.target.elements;
//
//   let reporteIx = element['reporte'].value;
//   let reporte = props.reporte[reporteIx];
//
//   let body = {
//     clave: reporte.descripcionCorta,
//     descripcion: reporte.descripcion,
//     formato: element['formato'].value,
//     parametros: {
//       RANGO_FECHA: {
//         fechaInicio: element['fechaInicio'].value,
//         fechaFin: element['fechaFin'].value
//       }
//     }
//   };
//
//   props.generarReporte(body);
// }

class Reportes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formato: undefined,
      reporte: undefined,
      fechaInicio: undefined,
      fechaFin: undefined
    };

    this.manejarCambioFormato = this.manejarCambioFormato.bind(this);
    this.manejadorCambioReporte = this.manejadorCambioReporte.bind(this);
    this.manejadorCambioFecha = this.manejadorCambioFecha.bind(this);
    this.manejadorEnvioFormulario = this.manejadorEnvioFormulario.bind(this);
  }

  manejarCambioFormato(indice) {
    let formato = this.props.formato[indice];

    this.setState({
      formato
    });
  }

  manejadorCambioReporte(indice) {
    let reporte = this.props.reporte[indice];

    this.setState({
      reporte
    });
  }

  manejadorCambioFecha(fecha, nombre) {
    this.setState({
      [nombre]: fecha
    });
  }

  manejadorEnvioFormulario(event) {
    event.preventDefault();

    const INICIO = new Date(this.state.fechaInicio);
    const FIN = new Date(this.state.fechaFin);

    if (INICIO > FIN) {
      const F_INI = document.getElementById('fechaInicio');

      F_INI.focus();
      F_INI.value = '';
      F_INI.setCustomValidity(TITLES.REPORTES.ERR_FECHA_FUT);

      if (F_INI.reportValidity) {
        F_INI.reportValidity();
      }
    } else {
      console.log(event.target, event.currentTarget, event.currentTarget);
      document.getElementById('btnDescargar').disabled = true;
      const BODY = {
        clave: this.state.reporte.descripcionCorta,
        descripcion: this.state.reporte.descripcion,
        formato: this.state.formato.descripcionCorta,
        parametros: {
          RANGO_FECHA: {
            fechaInicio: this.state.fechaInicio,
            fechaFin: this.state.fechaFin
          }
        }
      };

      this.props.generarReporte(BODY);
    }
  }

  componentDidMount() {
    setTimeout(
    this.props.recuperarCatalogos, 3000);
  }

  render() {
    const VACIO = !(this.props.reporte.length && this.props.formato.length);
    const DISABLED_BUTTON = VACIO || this.props.descargando;
    this.state.formato = this.props.formato[0];

    return (
      <div className='panel panel-default'>
        <Encabezado/>
        <div className='panel-body'>
          <form id='frmReportes'
                autoComplete='off'
                onSubmit={event => {this.manejadorEnvioFormulario(event)}}>
            <div className='col-lg-9 form-group'>
              <label htmlFor='slcReporte'
                     className='col-lg-3 control-label'>{TITLES.REPORTES.LBL_REPORTE}</label>
              <div className='col-lg-9'>
                <div className='input-group'>
                  <span className='input-group-addon'>
                    <span className='fa fa-bar-chart'/>
                  </span>
                  <SelectorReporte elementos={this.props.reporte}
                                   onChange={this.manejadorCambioReporte}/>
                  <SelectorFormato elementos={this.props.formato}
                                   seleccionado={this.state.formato || this.props.formato[0]}
                                   onChange={this.manejarCambioFormato}/>
                  <span className='input-group-addon asterisco-requerido'>
                    <span className='fa fa-asterisk'/>
                  </span>
                </div>
              </div>
            </div>
            <div className='col-lg-9 form-group'>
              <label htmlFor='fechaInicio'
                     className='col-lg-3 control-label'>{TITLES.REPORTES.LBL_FECHA}</label>
              <div className='col-lg-9'>
                <div className='input-group'>
                  <span className='input-group-addon'>
                    <span className='fa fa-calendar'/>
                  </span>
                  <SelectorFecha nombre='fechaInicio'
                                 ancho='50%'
                                 onChange={this.manejadorCambioFecha}/>
                  <SelectorFecha nombre='fechaFin'
                                 ancho='50%'
                                 onChange={this.manejadorCambioFecha}/>
                  <span className='input-group-addon asterisco-requerido'>
                    <span className='fa fa-asterisk'/>
                  </span>
                </div>
              </div>
            </div>
            <div className='col-lg-9 form-group'>
              <div className='pull-right'
                   style={{paddingRight: '15px'}}>
                <input id='btnDescargar'
                       className='btn btn-primary'
                       type='submit'
                       value={TITLES.REPORTES.LBL_BUTTON}
                       disabled={DISABLED_BUTTON}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default Reportes;
