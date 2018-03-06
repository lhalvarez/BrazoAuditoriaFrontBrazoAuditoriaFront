
import { API } from '../../constants/index'
import {addNotification} from '../../components/Global/GlobalActions'
import MessageService from '../../lib/utils/MessageService';

export const GET_DOCS = 'GET_DOCS'; // Acción para obtener los documentos que ya se tienen registrados
export const SAVE_DOC = 'SAVE_DOC'; //Acción para guardar/cargar el documento .Xls
export const DELETE_DOC = 'DELETE_DOC'; //Acción para eliminar el documento .Xls
export const SAVE_AUDITORIA = 'SAVE_AUDITORIA'; //Acción para guardar los datos de la autitoría
export const EDIT_AUDITORIA = 'EDIT_AUDITORIA'; //Acción para editar la auditoría
export const DELETE_AUDITORIA = 'DELETE_AUDITORIA'; //Acción para eliminar la auditoría

export function getDocs(){
  return(dispatch, getState) => {
    MessageService.getAll(API.USUARIOS.endpoint)
      .then((response) => {
        console.log('Entregando la lista de auditorías');
        dispatch( {type: GET_DOCS, payload: response });
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'success'));
      });
  }
}
export function saveDoc(formData){
  console.log(formData);
  return(dispatch, getState) => {
    MessageService.save(API.ENDPOINTS.PARTIDAS.CARGAR_DOCUMENTO.endpoint,formData)
      .then((response) => {
        console.log('Cargando Documento de Auditoría');
        dispatch( {type: SAVE_DOC, payload: response });
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'success'));
      });
  }
}
