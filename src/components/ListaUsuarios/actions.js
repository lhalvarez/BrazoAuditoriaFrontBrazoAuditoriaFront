import axios from 'axios';
import { API } from '../../constants/index'
import MessageService from '../../lib/utils/MessageService';

export const CONSULTA_USUARIOS = 'CONSULTA_USUARIOS';



export function consultaUsuarios(){


  return(dispatch, getState) => {


    MessageService.getAll(API.USUARIOS.endpoint)
      .then((response) => {

        console.log('Entregando la respuesta', response)
        dispatch( {type: CONSULTA_USUARIOS, payload: response })

      });


  }
}
