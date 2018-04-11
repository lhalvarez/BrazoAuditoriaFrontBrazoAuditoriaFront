

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


import MessageService from '../../../lib/utils/MessageService';

import {addNotification} from '../../Global/GlobalActions';
import {API, NUMERICAS} from '../../../constants';
import {store} from '../../../store';


export const EJECUTAR_SALIDA_REQ = 'EJECUTAR_SALIDA_REQ';
export const EJECUTAR_SALIDA_RES = 'EJECUTAR_SALIDA_RES';
export const ACTUALIZAR_LISTA_REQ = 'ACTUALIZAR_LISTA_REQ';
export const ACTUALIZAR_LISTA_RES = 'ACTUALIZAR_LISTA_RES';
export const ACTUALIZAR_LISTA_AUTOMATICO = 'ACTUALIZAR_LISTA_AUTOMATICO';



/**
 * Archivo que contiene las acciones necesarias para la pantalla de Salida de Prendas del deposito
 *
 * @author <a href="https://wiki.quarksoft.net/display/~cachavez">Carlos Chávez Melena</a>
 */


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
    dispatch({type: EJECUTAR_SALIDA_REQ});

    const URL = API.ENDPOINTS.GESTION.SALIDA.BUSQUEDA.endpoint.replace(':rfid', rfid).replace(':folio', folio);
    MessageService.update(URL, {p, t})
      .then(resultado => {
        dispatch(addNotification('Ejecutar Saida', 'Se ejecuto correctamente el marcado de la partida', 'info'));
        ejecutarSalidaRes(dispatch, false, '', '');
        actualizarListaRes(dispatch, resultado, p, t);
      })
      .catch(error => {
        let ep = false;
        let rf = '';
        let fo = '';

        if (typeof error === 'string') {
          dispatch(addNotification('Ejecutar Saida', 'Servicio temporalmente no disponible', 'error'));
        } else {
          if (error.data.object && error.data.object.codigoError === 'NMP_AUD_0003') {
            ep = true;
            rf = rfid;
            fo = folio;
            dispatch(addNotification('Ejecutar Saida', 'La partida especificada no existe', 'error'));
          } else {
            dispatch(addNotification('Ejecutar Saida', 'Ocurrio un error al ejecutar la salida de la partida', 'error'));
          }
        }

        ejecutarSalidaRes(dispatch, ep, rf, fo);
      });
  }
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

    MessageService.getAll(API.ENDPOINTS.GESTION.SALIDA.PAGINADO.endpoint, {p, t})
      .then(resultado => {
        if (resultado.object.totalElementos) {
          dispatch(addNotification('Actualizar Lista Partidas', 'La lista de partidas se actualizo correctamente', 'info'));
        } else {
          dispatch(addNotification('Actualizar Lista Partidas', 'No se encontraron partidas pendientes de salida', 'info'));
        }

        actualizarListaRes(dispatch, resultado, p, t);
      })
      .catch(error => {
        if (typeof error === 'string') {
          dispatch(addNotification('Actualizar Lista Partidas', 'Servicio temporalmente no disponible', 'error'));
        } else {
          dispatch(addNotification('Actualizar Lista Partidas', 'Ocurrio un error al actualizar la lista de partidas', 'error'));
        }

        dispatch({type: ACTUALIZAR_LISTA_RES, error: true});
      });
  }
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
  }
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
