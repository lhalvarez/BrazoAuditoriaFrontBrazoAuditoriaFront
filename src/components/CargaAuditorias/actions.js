
import { API } from '../../constants/index';
import { LEYENDAS } from '../../constants/index'
import {addNotification} from '../../components/Global/GlobalActions';
import {ADD_NOTIFICATION} from '../../components/Global/GlobalActions';
import HttpService from '../../lib/utils/HttpService';

export const GET_DOCS = 'GET_DOCS'; // Acción para obtener los documentos que ya se tienen registrados
export const GET_DOC = 'GET_DOC'; //Acción para obtener el documento .Xls relacionado a una sola carga
export const SAVE_DOC = 'SAVE_DOC'; //Acción para guardar/cargar el documento .Xls
export const DELETE_DOC = 'DELETE_DOC'; //Acción para eliminar el documento .Xls
export const GET_AUDITORIAS = 'GET_AUDITORIAS'; // Acción para obtener la carga completa de auditorías
export const GET_AUDITORIA = 'GET_AUDITORIA'; // Acción para obtener la carga correspondiente al id pasado
export const SAVE_AUDITORIA = 'SAVE_AUDITORIA'; //Acción para guardar los datos de la autitoría
export const DELETE_AUDITORIA = 'DELETE_AUDITORIA'; //Acción para eliminar la auditoría
export const CLOSE_MODAL = 'CLOSE_MODAL'; //Acción para eliminar la auditoría
export const NO_PARTIDAS = 'NO_PARTIDAS'; //Acción para regresar un estado sin auditorias encontradas
export const UPDATE_PAGE = 'UPDATE_PAGE'; //Acción para actualizar tabla
export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT'; //Acción para mostrar la alerta de error
export const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT'; //Acción para ocultar la alerta de error

export function getDocs(page, pageSize,tipoAuditoria){
  if(tipoAuditoria === 2){
    tipoAuditoria = 0;
  }
  const params = {
    p: page,
    t: pageSize,
    tipoAuditoria:tipoAuditoria
  };

  return (dispatch)=>{
    HttpService.get(API.ENDPOINTS.PARTIDAS.LEER_AUDITORIAS.endpoint,params)
      .then((response) => {
        dispatch( {type: GET_AUDITORIAS, payload: response });

        var errorExist = 0;
        if(response.object.contenido){
          response.object.contenido.forEach(function (value) {
            if(value.carga.estadoCarga.id === 4){
              errorExist++;
            }

          });
        }
        if(errorExist > 0){
          dispatch( {type: SHOW_ERROR_ALERT });
        }

      }).catch(error => {
        if(error.data.message === 'No se encontraron registros para las auditorias solicitadas'){
          dispatch( {type: NO_PARTIDAS });
          dispatch(addNotification('Carga de registros','Sin auditorías por autorizar' , 'info'));
        }else{
          dispatch(addNotification('Carga de registros',''+ error.data.message , 'info'));
        }

    });
  }

}

export function getDoc(nombreArchivo){
  return (dispatch)=>{
    HttpService.getById(API.ENDPOINTS.PARTIDAS.LEER_DOCUMENTO.endpoint,nombreArchivo)
      .then((response) => {
        dispatch( {type: GET_DOC, payload: response });
        dispatch(addNotification('Documento cargado exitósamente', 'success'));
      }).catch(error => {
      dispatch(addNotification('Se ha generado un error!',''+ error.data.message , 'error'));
      });
  }
}
export function saveDoc(formData,onUploadProgress){

  return(dispatch, getState) => {
    HttpService.upload(API.ENDPOINTS.PARTIDAS.CARGAR_DOCUMENTO.endpoint,formData,onUploadProgress)
      .then((response) => {
        dispatch( {type: SAVE_DOC, payload: response });
        dispatch(addNotification('Carga exitosa','Se ha cargado el documento exitósamente', 'success'));
      }).catch(error => {
        console.log(error);
        dispatch(addNotification('Se ha generado un error!',error, 'error'));
      });
  }

}

export function deleteDoc(idCarga,tipoAuditoria){
  const params = {
    idAuditoria: idCarga
  };
  return (dispatch)=>{

    HttpService.destroy(`${API.ENDPOINTS.AUDITORIA.BORRAR.endpoint}/${idCarga}`)
      .then((response) => {
        dispatch( {type: DELETE_DOC });
        dispatch( {type: CLOSE_MODAL });
        dispatch(addNotification('Respuesta', response.message ,'success'));
        dispatch(getDocs(0, 10,tipoAuditoria));

      }).catch(error => {
        dispatch(addNotification('Se ha generado un error!',''+ error.data.message , 'error'));
      });
  }
}

export function saveAuditoria(formData){
  return(dispatch) => {
    HttpService.post(API.ENDPOINTS.PARTIDAS.CARGAR_AUDITORIA.endpoint,formData)
      .then((response) => {
        dispatch( {type: SAVE_AUDITORIA, payload: response });
        dispatch(addNotification('Se ha iniciado un nuevo proceso de Auditoría','', 'info'));
      }).catch(error => {
        dispatch(addNotification('Error',''+ error.data.message + '. Código:'+error.data.object.codigoError, 'error'));
      });
  }
}
export function deleteAuditoria(idAuditoria){
  return(dispatch, getState) => {
    dispatch( {type: DELETE_DOC, payload: idAuditoria });
  }
}
export function sendNotification(title,message,level){
  return (dispatch) => {
    dispatch( {type: ADD_NOTIFICATION});
    dispatch(addNotification(title,message ,level));
  }
}
export function closeModal(){
  return (dispatch) => {
		dispatch({ type: CLOSE_MODAL });
  }
}

export function updatePage(){
  return (dispatch) => {
		dispatch({ type: UPDATE_PAGE });
  }
}

export function closeErrorAlert(){
  return (dispatch) => {
    dispatch({ type: CLOSE_ERROR_ALERT });
  }
}
