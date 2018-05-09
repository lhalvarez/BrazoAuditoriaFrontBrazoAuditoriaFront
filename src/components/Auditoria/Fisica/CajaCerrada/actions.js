import { API, CATALOGOS } from '../../../../constants';
import MessageService from '../../../../lib/utils/MessageService';
import { addNotification } from '../../../Global/GlobalActions';

export const ERROR_CARGAR_DETALLE_PARTIDA= 'ERROR_CARGAR_DETALLE_PARTIDA';

export const ENVIANDO_DETALLE_PARTIDA = 'ENVIANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_ENVIADA = 'DETALLE_PARTIDA_ENVIADA';
export const ERROR_ENVIAR_DETALLE_PARTIDA = 'ERROR_ENVIAR_DETALLE_PARTIDA';


export const GET_DETALLE_PARTIDA_CAJA_CERRADA = 'GAT_DETALLE_PARTIDA_CAJA_CERRADA';
export const GAT_CATALOGO_OBSERVACIONES = 'GAT_CATALOGO_OBSERVACIONES';

export function cargarDetallePartida(){
  return dispatch => dispatch({ type: CARGAR_DETALLE_PARTIDA })
}

export function obtenerDetallePartida(rfid,folio){
  return dispatch => {
    MessageService.getAll(`${API.ENDPOINTS.AUDITORIA.FISICA.CAJA_CERRADA.DETALLE_PARTIDA.endpoint}${rfid}/${folio}`)
      .then(response => {
        MessageService.getAll(`${API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint}/${CATALOGOS.OBSERVACION}`)
          .then(catResponse => {
            dispatch({ type: GET_DETALLE_PARTIDA_CAJA_CERRADA, ...response.object, rfid, folio, tiposObservacion: catResponse.object.registros });
            dispatch( addNotification(API.AVISOS.GLOBAL.consulta_exitosa,response.message,'success') );
          })
          .catch(error => {
            dispatch({ type: ERROR_CARGAR_DETALLE_PARTIDA });
            dispatch( addNotification(API.AVISOS.GLOBAL.error_consulta,error.data.message,'error') );
          });
      })
      .catch(error => {
        dispatch({ type: ERROR_CARGAR_DETALLE_PARTIDA });
        dispatch( addNotification(API.AVISOS.GLOBAL.error_consulta,error.data.message,'error') );
      });
  }
}
