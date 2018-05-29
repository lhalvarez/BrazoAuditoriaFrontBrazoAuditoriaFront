

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


import {NUMERICAS} from '../../../constants';

import {
  EJECUTAR_SALIDA_REQ,
  EJECUTAR_SALIDA_RES,
  ACTUALIZAR_LISTA_REQ,
  ACTUALIZAR_LISTA_RES,
  DESMONTAR_COMPONENTE,
  ACTUALIZAR_LISTA_AUTOMATICO
} from './actions';


/**
 * Archivo que contiene el reductor para la pantalla de Salida de Prendas del deposito
 *
 * @author <a href="https://wiki.quarksoft.net/display/~cachavez">Carlos Chávez Melena</a>
 */


/**
 * Estado inicial
 *
 * @type {{ejecutando: boolean, actualizando: boolean, partidas: {contenido: Array, totalElementos: number}, errorParametros: boolean, rfid: string, folio: string, intervalId: undefined, automatico: boolean, p: number, t: number}}
 */
const SALIDA_PARTIDAS_ESTADO_INICIAL = {
  ejecutando: false,
  actualizando: true,
  partidas: {
    contenido: [],
    totalElementos: 0
  },
  errorParametros: false,
  rfid: '',
  folio: '',
  intervalId: undefined,
  automatico: false,
  p: 0,
  t: NUMERICAS.GESTION.SALIDA.TABLE_PAGE_SIZE
};

/**
 * Función reductora para el componente Salida de Prendas del deposito
 *
 * @param state Estado del componente
 * @param action Accción disparada
 *
 * @returns {{ejecutando: boolean, actualizando: boolean, partidas: {contenido: Array, totalElementos: number}, errorParametros: boolean, rfid: string, folio: string, intervalId: undefined, automatico: boolean, p: number, t: number}}
 */
export default function salidaReducer(state = SALIDA_PARTIDAS_ESTADO_INICIAL, action) {
  switch (action.type) {
    case EJECUTAR_SALIDA_REQ:
      return {...state, ...action.payload, ejecutando: true};
    case EJECUTAR_SALIDA_RES:
      return {...state, ...action.payload, ejecutando: false};
    case ACTUALIZAR_LISTA_REQ:
      return {...state, actualizando: true};
    case ACTUALIZAR_LISTA_RES:
      return {...state, ...action.payload, actualizando: false};
    case ACTUALIZAR_LISTA_AUTOMATICO:
      return {...state, ...action.payload};
    case DESMONTAR_COMPONENTE:
      return {...state, ...SALIDA_PARTIDAS_ESTADO_INICIAL};
    default:
      return state;
  }
}
