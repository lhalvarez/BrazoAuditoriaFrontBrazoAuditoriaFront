

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
import Reportes from '../../components/reportes';

import {TITLES} from '../../constants';

import {recuperarCatalogos} from '../../components/reportes/actions/catalogo';
import {generarReporte} from '../../components/reportes/actions/reporte';


/**
 * Contenedor para la vista que permitira la generación de Reportes
 *
 * @author <a href="https://wiki.quarksoft.net/display/~cachavez">Carlos Chávez Melena</a>
 */
class ReportesContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ContainerTitle title={TITLES.REPORTES.TITULO}/>
        <Reportes {...this.props}/>
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
    reporte: state.reportes.reporte,
    errreporte: state.reportes.errreporte,
    formato: state.reportes.formato,
    errformato: state.reportes.errformato,
    descargando: state.reportes.descargando
  };
}


export default connect(mapStateToProps, {recuperarCatalogos, generarReporte})(ReportesContainer);
