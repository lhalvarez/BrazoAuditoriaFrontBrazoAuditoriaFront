import { API, CATALOGOS } from '../../../../constants';
import MessageService from '../../../../lib/utils/MessageService';
import { addNotification } from '../../../Global/GlobalActions';

export const ERROR_CARGAR_DETALLE_PARTIDA_CAJA_CERRADA= 'ERROR_CARGAR_DETALLE_PARTIDA_CAJA_CERRADA';
export const GET_DETALLE_PARTIDA_CAJA_CERRADA = 'GAT_DETALLE_PARTIDA_CAJA_CERRADA';
export const FLUSH_DETALLE_PARTIDA = 'FLUSH_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_CC_ENVIADA = 'DETALLE_PARTIDA_CC_ENVIADA';

const PARAM_FILTRO_CAT_EST = {
  f: 'ESTATUS_RESULTADO_TIPO_AUDITORIA',
  p: 2
};

export function obtenerDetallePartida(rfid,folio){
  return dispatch => {
    MessageService.getAll(`${API.ENDPOINTS.AUDITORIA.FISICA.CAJA_CERRADA.DETALLE_PARTIDA.endpoint}${rfid}/${folio}/2`)
      .then(response => {
        MessageService.getAll(`${API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint}/${CATALOGOS.ESTATUS}`, PARAM_FILTRO_CAT_EST)
          .then(catResponse => {
            dispatch({ type: GET_DETALLE_PARTIDA_CAJA_CERRADA, ...response.object, rfid, folio, tiposObservacion: catResponse.object.registros });
            dispatch( addNotification(API.AVISOS.GLOBAL.consulta_exitosa,response.message,'success') );
          })
          .catch(error => {
            dispatch({ type: ERROR_CARGAR_DETALLE_PARTIDA_CAJA_CERRADA });
            dispatch( addNotification(API.AVISOS.GLOBAL.error_consulta,error.data.message,'error') );
          });
      })
      .catch(error => {
        dispatch({ type: ERROR_CARGAR_DETALLE_PARTIDA_CAJA_CERRADA });
        dispatch( addNotification(API.AVISOS.GLOBAL.error_consulta,error.data.message,'error') );
      });
  }
}

export function flushdetallePartida(){
  return dispatch => {
    dispatch({type:FLUSH_DETALLE_PARTIDA});
  }
}

export function enviarResultado(requestBody){
  return dispatch => {
    MessageService.save(API.ENDPOINTS.AUDITORIA.RESULTADO.endpoint,requestBody)
      .then(response => {
        dispatch({ type: DETALLE_PARTIDA_CC_ENVIADA });
        dispatch( addNotification(API.AVISOS.GLOBAL.consulta_exitosa,response.message,'success') );
      })
      .catch(error => {
        dispatch( addNotification('Error al guardar',error.data.message,'error') );
      });
  }
}
