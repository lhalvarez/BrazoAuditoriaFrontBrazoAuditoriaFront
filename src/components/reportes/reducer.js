

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


import {
  RECUPERAR_CATALOGOS_REPORTES,
} from './actions/catalogo';

import {
  GENERAR_REPORTE_REQ,
  GENERAR_REPORTE_RES
} from './actions/reporte'


const REPORTES_ESTADO_INICIAL = {
  reporte: [],
  errreporte: false,
  formato: [],
  errformato: false,
  descargando: false
};


export default function reportesReducer(state = REPORTES_ESTADO_INICIAL, action) {
  switch (action.type) {
    case RECUPERAR_CATALOGOS_REPORTES:
      return {...state, ...action.payload};
    case GENERAR_REPORTE_REQ:
      return {...state, ...action.payload, descargando: true};
    case GENERAR_REPORTE_RES:
      return {...state, ...action.payload, descargando: false};
    default:
      return state;
  }
}
