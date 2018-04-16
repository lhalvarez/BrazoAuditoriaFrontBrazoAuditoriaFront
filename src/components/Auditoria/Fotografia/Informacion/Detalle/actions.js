
import { API } from '../../../../../constants/index'
import {addNotification, ADD_NOTIFICATION} from '../../../../Global/GlobalActions';
import MessageService from '../../../../../lib/utils/MessageService';

export const GET_PARTIDA_DETAIL = 'GET_PARTIDA_DETAIL';
export const GET_CAT_ESTADO_AUDITORIA = 'GET_CAT_ESTADO_AUDITORIA';

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

export function sendNotification(title,message,type){
  return (dispatch) => {
    dispatch( {type: ADD_NOTIFICATION});
    dispatch(addNotification(title,message ,type));

  }
}
