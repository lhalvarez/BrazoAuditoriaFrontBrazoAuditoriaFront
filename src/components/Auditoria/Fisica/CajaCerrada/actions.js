import { API, CATALOGOS } from '../../../../constants';
import MessageService from '../../../../lib/utils/MessageService';
import { addNotification } from '../../../Global/GlobalActions';

export const CARGAR_DETALLE_PARTIDA= 'CARGAR_DETALLE_PARTIDA';
export const CARGANDO_DETALLE_PARTIDA= 'CARGANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_CARGADA= 'DETALLE_PARTIDA_CARGADA';
export const ERROR_CARGAR_DETALLE_PARTIDA= 'ERROR_CARGAR_DETALLE_PARTIDA';

export const ENVIANDO_DETALLE_PARTIDA = 'ENVIANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_ENVIADA = 'DETALLE_PARTIDA_ENVIADA';
export const ERROR_ENVIAR_DETALLE_PARTIDA = 'ERROR_ENVIAR_DETALLE_PARTIDA';

export const TEST = 'TEST';

export function cargarDetallePartida(){
	return dispatch => dispatch({ type: CARGAR_DETALLE_PARTIDA })
}

export function obtenerDetallePartida(rfid,folio){
  return dispatch => {
    dispatch({ type: CARGANDO_DETALLE_PARTIDA });
    //MessageService.getById(API.ENDPOINTS.PARTIDAS.DETALLE.DETALLE_PARTIDA.endpoint,folio)
    MessageService.getAll(`${API.ENDPOINTS.AUDITORIA.FISICA.CAJA_CERRADA.DETALLE_PARTIDA.endpoint}${rfid}/${folio}`)
      .then(response => {
        MessageService.getAll(`${API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint}/${CATALOGOS.OBSERVACION}`)
          .then(catResponse => {
            dispatch({ type: DETALLE_PARTIDA_CARGADA, ...response.object, rfid, folio, tiposObservacion: catResponse.object.registros });
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

export function newTest(folio){
  return (dispatch)=>{
    MessageService.getById(API.ENDPOINTS.PARTIDAS.DETALLE.DETALLE_PARTIDA.endpoint,folio)
      .then((response) => {
        MessageService.getAll(`${API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint}/${CATALOGOS.OBSERVACION}`)
          .then(otherresponse => {
            dispatch({type: TEST, payload: response,tiposObservacion:otherresponse });
          })
          .catch(error => {
            dispatch(addNotification('Se ha generado un error!',''+ error.data.message , 'error'));
          });

      })
      .catch(error => {
        dispatch(addNotification('Se ha generado un error!',''+ error.data.message , 'error'));
      });
  }
}
