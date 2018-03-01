
import { API } from '../../constants/index'
import {addNotification} from '../../components/Global/GlobalActions'
import MessageService from '../../lib/utils/MessageService';

export const GET_DOCS = 'GET_DOCS';



export function getDocs(){


  return(dispatch, getState) => {


    MessageService.getAll(API.USUARIOS.endpoint)
      .then((response) => {
        console.log('Entregando la respuesta', response)
        dispatch( {type: GET_DOCS, payload: response })
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'success'));
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'error'));
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'warning'));
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,"La consulta de usuarios se realizo de forma exitosa", 'info'));

      });

  }
}
