

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
import GrupoReporte from './componentes/grupo-reporte';
import GrupoFecha from './componentes/grupo-fecha';
import GrupoGenerar from './componentes/grupo-generar';

import {TITLES} from '../../constants/index';


const CLASSE_CSS_ERROR = 'has-error';

function armarCuerpo(state) {
  return {
    clave: state.reporte.descripcionCorta,
    descripcion: state.reporte.descripcion,
    formato: state.formato.descripcionCorta,
    parametros: {
      RANGO_FECHA: {
        fechaInicio: state.fechaInicio,
        fechaFin: state.fechaFin
      }
    }
  };
}

function mostrarErrorFechaInicio() {
  const F_INI = document.getElementById('fechaInicio');

  F_INI.focus();
  F_INI.value = '';
  F_INI.setCustomValidity(TITLES.REPORTES.ERR_FECHA_INI);

  if (F_INI.reportValidity) {
    F_INI.reportValidity();
  }
}


class Reportes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formato: undefined,
      reporte: undefined,
      fechaInicio: undefined,
      fechaFin: undefined,
      progress: false,
      invalidRep: '',
      invalidFec: ''
    };

    this.manejadorInvalido = this.manejadorInvalido.bind(this);
    this.manejadorCambioFecha = this.manejadorCambioFecha.bind(this);
    this.manejadorCambioReporte = this.manejadorCambioReporte.bind(this);
    this.manejadorEnvioFormulario = this.manejadorEnvioFormulario.bind(this);
  }

  manejadorCambioReporte(indice, nombre) {
    let elemento = this.props[nombre][indice];

    this.setState({
      [nombre]: elemento
    });
  }

  manejadorCambioFecha(fecha, nombre) {
    this.setState({
      [nombre]: fecha
    });
  }

  manejadorInvalido(event) {
    this.setState({
      invalidRep: event.target instanceof HTMLSelectElement ? CLASSE_CSS_ERROR : this.state.invalidRep,
      invalidFec: event.target instanceof HTMLInputElement ? CLASSE_CSS_ERROR : this.state.invalidFec
    });
  }

  manejadorEnvioFormulario(event) {
    event.preventDefault();

    const INICIO = new Date(this.state.fechaInicio);
    const FIN = new Date(this.state.fechaFin);

    if (INICIO > FIN) {
      this.setState({
        invalidFec: CLASSE_CSS_ERROR
      }, mostrarErrorFechaInicio);
    } else {
      document.getElementById('fechaInicio').setCustomValidity('');

      this.setState({
        invalidRep: '',
        invalidFec: '',
        progress: true,
      }, () => this.props.generarReporte(armarCuerpo(this.state)));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      progress: (this.state.progress !== nextProps.descargando ? nextProps.descargando : this.state.progress),
      formato: (this.state.formato !== nextProps.formato[0] ? nextProps.formato[0] : this.state.formato)
    });
  }

  componentDidMount() {
    if (!(this.props.reporte.length && this.props.formato.length)) {
      this.props.recuperarCatalogos();
    }
  }

  render() {
    const VACIO = !(this.props.reporte.length && this.props.formato.length);
    const DISABLED_BUTTON = VACIO || this.props.descargando;

    return (
      <div className='panel panel-default'>
        <Encabezado/>
        <div className='panel-body'>
          <form id='frmReportes'
                autoComplete='off'
                onInvalid={this.manejadorInvalido}
                onSubmit={event => {this.manejadorEnvioFormulario(event)}}>
            <GrupoReporte cssErr={this.state.invalidRep}
                          reportes={this.props.reporte}
                          formatos={this.props.formato}
                          seleccionado={this.state.formato}
                          manejadorCambioReporte={this.manejadorCambioReporte}/>
            <GrupoFecha cssErr={this.state.invalidFec}
                        manejadorCambioFecha={this.manejadorCambioFecha}/>
            <GrupoGenerar activo={DISABLED_BUTTON}
                          progress={this.state.progress}/>
          </form>
        </div>
      </div>
    )
  }
}


export default Reportes;
