

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
import {connect} from "react-redux";

import ContainerTitle from '../../components/Global/ContainerTitle';
import SalidaPartidasBusqueda from '../../components/gestion/salida/busqueda';
import SalidaPartidasLista from '../../components/gestion/salida/lista';

import {TITLES} from '../../constants';
import {ejecutarSalida, actualizarLista, autoActualizarLista} from '../../components/gestion/salida/actions';
import {generarReporte} from "../../components/reportes/actions/reporte";


/**
 * Contenedor para la vista que permitira la salida logica de las partidas para auditoria fisica
 *
 * @author <a href="https://wiki.quarksoft.net/display/~cachavez">Carlos Chávez Melena</a>
 */
class SalidaPartidas extends Component{
  /**
   * Se encarga de construir el componente
   *
   * @returns Elementos graficos del componente
   */
  render(){
		return (
			<div>
				<ContainerTitle title={TITLES.GESTION.SALIDA.TITULO}/>
        <SalidaPartidasBusqueda {...this.props}/>
        <SalidaPartidasLista {...this.props}/>
			</div>
		);
	}
}

/**
 * Pemite especificar los elementos del estado que interesan
 * al componente, para que estos sean mapeados como propiedades
 *
 * @param state Estado general de la aplicaión
 *
 * @returns {{ejecutando: *|boolean, actualizando: *|boolean, partidas: *|{contenido: Array, totalElementos: number}, errorParametros: *|boolean, p, t}}
 */
function mapStateToProps(state) {
  return {
    ejecutando: state.salidaPartidas.ejecutando,
    actualizando: state.salidaPartidas.actualizando,
    partidas: state.salidaPartidas.partidas,
    errorParametros: state.salidaPartidas.errorParametros,
    folio: state.salidaPartidas.folio,
    rfid: state.salidaPartidas.rfid,
    automatico: state.salidaPartidas.automatico,
    p: state.salidaPartidas.p,
    t: state.salidaPartidas.t,
    descargando: state.reportes.descargando
  };
}


export default connect(mapStateToProps, {ejecutarSalida, actualizarLista, autoActualizarLista, generarReporte})(SalidaPartidas);
