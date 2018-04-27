
import { API } from '../../../../../constants/index'
import {addNotification, ADD_NOTIFICATION} from '../../../../Global/GlobalActions';
import MessageService from '../../../../../lib/utils/MessageService';


export const GET_PARTIDA_DETAIL = 'GET_PARTIDA_DETAIL';
export const GET_CAT_ESTADO_AUDITORIA = 'GET_CAT_ESTADO_AUDITORIA';
export const ENVIANDO_DETALLE_PARTIDA = 'ENVIANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_ENVIADA = 'DETALLE_PARTIDA_ENVIADA';

export function getPartidaDetail(folio){
  return (dispatch)=>{
    MessageService.getById(API.ENDPOINTS.PARTIDAS.DETALLE.DETALLE_PARTIDA.endpoint,folio)
      .then((response) => {
        dispatch( {type: GET_PARTIDA_DETAIL, payload: response });
      }).catch(error => {
      dispatch(addNotification('Se ha generado un error!',''+ error.data.message , 'error'));
    });
  }
}
export function getCatEstadoAuditoria(){
  const Nombre_Cat = 'tipo_observacion';
  return (dispatch)=>{
    MessageService.getById(API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint,Nombre_Cat)
      .then((response) => {
        dispatch( {type: GET_CAT_ESTADO_AUDITORIA, payload: response });
      }).catch(error => {
      dispatch(addNotification('Se ha generado un error!',''+ error.data.message , 'error'));
    });
  }
}

export function enviarDetallePartida(requestBody){

  return dispatch => {
    MessageService.save(API.ENDPOINTS.AUDITORIA.RESULTADO.endpoint,requestBody)
      .then(response => {
        dispatch({ type: DETALLE_PARTIDA_ENVIADA });
        dispatch( addNotification(API.AVISOS.GLOBAL.consulta_exitosa,response.message,'success') );
      })
      .catch(error => {
        dispatch( addNotification('Error al guardar',error.data.message,'error') );
      });

  };
}
