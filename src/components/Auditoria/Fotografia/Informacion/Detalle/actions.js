
import { API, CATALOGOS } from '../../../../../constants/index'
import {addNotification, ADD_NOTIFICATION} from '../../../../Global/GlobalActions';
import MessageService from '../../../../../lib/utils/MessageService';

import { history } from '../../../../../history';


export const GET_PARTIDA_DETAIL = 'GET_PARTIDA_DETAIL';
export const GET_CAT_ESTADO_AUDITORIA = 'GET_CAT_ESTADO_AUDITORIA';
export const ENVIANDO_DETALLE_PARTIDA = 'ENVIANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_ENVIADA = 'DETALLE_PARTIDA_ENVIADA';
export const FLUSH_DETALLE_PART = 'FLUSH_DETALLE_PART';

const PARAM_FILTRO_CAT_EST = {
  f: 'ESTATUS_RESULTADO_TIPO_AUDITORIA',
  p: 1
};

export function getPartidaDetail(folio,idAuditoria){

  return (dispatch)=>{
    MessageService.getById(API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.PARTIDAS.BUSQUEDA.endpoint.replace(":idAuditoria", idAuditoria.toString()),folio)
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
    MessageService.getAll(`${API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint}/${CATALOGOS.ESTATUS}`, PARAM_FILTRO_CAT_EST)
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
        history.push('/auditoria-fotografia');
      })
      .catch(error => {
        dispatch( addNotification('Error al guardar',error.data.message,'error') );
      });

  };
}
export function flushdetallePartida(){
  return dispatch => {
    dispatch({type:FLUSH_DETALLE_PART});
  }
}
