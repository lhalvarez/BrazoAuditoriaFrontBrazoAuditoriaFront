
import { API } from '../../constants/index'
import {addNotification} from '../Global/GlobalActions'
import MessageService from '../../lib/utils/MessageService';

export const CONSULTA_USUARIOS = 'CONSULTA_USUARIOS';



export function consultaUsuarios(){


  return(dispatch, getState) => {


    MessageService.getAll(API.USUARIOS.endpoint)
      .then((response) => {

        console.log('Entregando la respuesta', response);
        dispatch( {type: CONSULTA_USUARIOS, payload: response });
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'success'));
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'error'));
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,'La consulta de usuarios se realizo de forma exitosa', 'warning'));
        dispatch(addNotification(API.AVISOS.USUARIOS.consulta_exito,"La consulta de usuarios se realizo de forma exitosa", 'info'));

      });

  }

}
