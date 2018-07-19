

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


import HttpService from '../../../lib/utils/HttpService';

import {addNotification} from '../../Global/GlobalActions';
import {API, NUMERICAS} from '../../../constants';
import {store} from '../../../store';


export const EJECUTAR_SALIDA_REQ = 'EJECUTAR_SALIDA_REQ';
export const EJECUTAR_SALIDA_RES = 'EJECUTAR_SALIDA_RES';
export const ACTUALIZAR_LISTA_REQ = 'ACTUALIZAR_LISTA_REQ';
export const ACTUALIZAR_LISTA_RES = 'ACTUALIZAR_LISTA_RES';
export const ACTUALIZAR_LISTA_AUTOMATICO = 'ACTUALIZAR_LISTA_AUTOMATICO';
export const DESMONTAR_COMPONENTE = 'DESMONTAR_COMPONENTE';



/**
 * Archivo que contiene las acciones necesarias para la pantalla de Salida de Prendas del deposito
 *
 * @author <a href="https://wiki.quarksoft.net/display/~cachavez">Carlos Chávez Melena</a>
 */

const BUSQUEDA = API.AVISOS.GESTION.SALIDA.BUSQUEDA;
const LISTA = API.AVISOS.GESTION.SALIDA.LISTA;


/**
 * Dispara la acción de termino de la solicitud de marcado de partidas
 *
 * @param dispatch Dispatch
 * @param errorParametros Indica algun error relacionado a la información capturada
 * @param rfid Rfid capturado
 * @param folio Folio capturado
 */
function ejecutarSalidaRes(dispatch, errorParametros, rfid, folio) {
    dispatch({type: EJECUTAR_SALIDA_RES, payload: {errorParametros, rfid, folio}});
}

/**
 * Dispara la acción de solicitud de marcado de partidas
 *
 * @param rfid Rfid capturado
 * @param folio Folio capturado
 * @param p Pagina actual
 * @param t Tamaño de pagina
 *
 * @returns {function(*=)}
 */
export function ejecutarSalida(rfid, folio, p, t) {
  return dispatch => {
    dispatch({type: EJECUTAR_SALIDA_REQ, payload: {errorParametros: false, rfid: rfid, folio: folio}});

    const URL = API.ENDPOINTS.GESTION.SALIDA.BUSQUEDA.endpoint.replace(':rfid', rfid).replace(':folio', folio);
    HttpService.patch(URL, {p, t})
      .then(resultado => {
        dispatch(addNotification(BUSQUEDA.TITULO, BUSQUEDA.CORRECTO, 'success'));
        ejecutarSalidaRes(dispatch, false, '', '');
        actualizarListaRes(dispatch, resultado, p, t);
      })
      .catch(error => {
        let ep = false;
        let rf = '';
        let fo = '';

        if (typeof error === 'string') {
          dispatch(addNotification(BUSQUEDA.TITULO, BUSQUEDA.NO_DISPONIBLE, 'error'));
        } else {
          if (error.data.object && error.data.object.codigoError === 'NMP_AUD_0003') {
            ep = true;
            rf = rfid;
            fo = folio;
            dispatch(addNotification(BUSQUEDA.TITULO, BUSQUEDA.NMP_AUD_0003, 'error'));
          } else {
            dispatch(addNotification(BUSQUEDA.TITULO, BUSQUEDA.NMP_AUD_9999, 'error'));
          }
        }

        ejecutarSalidaRes(dispatch, ep, rf, fo);
      });
  };
}

/**
 * Dispara la acción de solicitud de partidas con salida fisica
 *
 * @param p Pagina a consultar
 * @param t Tamaño de pagina
 *
 * @returns {function(*=)}
 */
export function actualizarLista(p, t) {
  return dispatch => {
    dispatch({type: ACTUALIZAR_LISTA_REQ});

    HttpService.get(API.ENDPOINTS.GESTION.SALIDA.PAGINADO.endpoint, {p, t})
      .then(resultado => {
        if (resultado.object.totalElementos) {
          dispatch(addNotification(LISTA.TITULO, LISTA.CORRECTO, 'success'));
        } else {
          dispatch(addNotification(LISTA.TITULO, LISTA.VACIO, 'info'));
        }

        actualizarListaRes(dispatch, resultado, p, t);
      })
      .catch(error => {
        if (typeof error === 'string') {
          dispatch(addNotification(LISTA.TITULO, LISTA.NO_DISPONIBLE, 'error'));
        } else {
          dispatch(addNotification(LISTA.TITULO, LISTA.NMP_AUD_9999, 'error'));
        }

        dispatch({
          type: ACTUALIZAR_LISTA_RES,
          payload: {
            p,
            t
          },
          error: true});
      });
  };
}

/**
 * Dispara la acción de termino de la solicitud de partidas con salida fisica
 *
 * @param dispatch Dispatch
 * @param partidas Resultado
 * @param p Pagina a consultar
 * @param t Tamaño de pagina
 */
function actualizarListaRes(dispatch, partidas, p, t) {
  dispatch({
    type: ACTUALIZAR_LISTA_RES,
    payload: {
      partidas: partidas.object,
      p,
      t
    }});
}

/**
 * Se encarga de registrar el intervalo de tiempo para actualizar automaticamente la lista de partidas
 *
 * @param automatico Indica si se actualizara automaticamente
 *
 * @returns {function(*=)}
 */
export function autoActualizarLista(automatico) {
  return dispatch => {
    clearInterval(store.getState().salidaPartidas.intervalId);

    if (automatico) {
      autoActualizarListaInterval(dispatch);
      let intervalId = setInterval(autoActualizarListaInterval, NUMERICAS.GESTION.SALIDA.AUTO_ACTUALIZAR, dispatch);
      autoActualizarListaRes(dispatch, intervalId, automatico);
    } else {
      autoActualizarListaRes(dispatch, undefined, automatico);
    }
  };
}

export function desmontarComponente() {
  clearInterval(store.getState().salidaPartidas.intervalId);

  return dispatch => {
    dispatch({
      type: DESMONTAR_COMPONENTE,
    });
  };
}


/**
 * Dispara la acción indicando el identificador del intervalo para la auto actualización
 * @param dispatch Dispatch
 * @param intervalId Identificador del intervalo
 * @param automatico Indica si es automatico
 */
function autoActualizarListaRes(dispatch, intervalId, automatico) {
  dispatch({
    type: ACTUALIZAR_LISTA_AUTOMATICO,
    payload: {
      intervalId,
      automatico
    }
  });
}

/**
 * Se encarga de lanzar la acción para la actualizacion automatica
 *
 * @param dispatch Dispatch
 */
function autoActualizarListaInterval(dispatch) {
  if (!store.getState().salidaPartidas.actualizando) {
    actualizarLista(store.getState().salidaPartidas.p, store.getState().salidaPartidas.t)(dispatch);
  }
}
