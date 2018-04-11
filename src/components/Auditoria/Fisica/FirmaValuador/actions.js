import { API } from '../../../../constants/index'
import {addNotification} from '../../../Global/GlobalActions';
import {ADD_NOTIFICATION} from '../../../Global/GlobalActions';
import MessageService from '../../../../lib/utils/MessageService';

export const VALIDAR_USUARIO= 'VALIDAR_USUARIO';
export const OCULTAR_DETALLE= 'OCULTAR_DETALLE';
export const CERRAR_MODAL= 'CERRAR_MODAL';

export function validarUsuario(valuador,clave){
	const params = {
    	usuario: valuador,
    	clave: clave
  	};
	
	return (dispatch)=>{
	    MessageService.save(API.ENDPOINTS.SEGURIDAD.VALIDAR_USUARIO.endpoint,params)
	      .then((response) => {
	        dispatch( {type: VALIDAR_USUARIO, payload: response});
	      }).catch(error => {
	      	if(error.data.code === '401'){
	      		dispatch(addNotification('Se ha generado un error!','Las credenciales ingresadas son incorrectas' , 'error'));
	      	}
	      	else{
	      		dispatch(addNotification('Se ha generado un error!',''+ error.data.object.descripcionError , 'error'));
	      	}
	    });
  	}
}

export function requeridos(mensaje){
	
	return (dispatch)=>{
		dispatch( {type: OCULTAR_DETALLE });
	    dispatch( {type: ADD_NOTIFICATION});
	    dispatch(addNotification('Se ha generado un error!', mensaje, 'error'));
	}
}

export function dismiss(){
	return dispatch => {
		$('#modalFirmaValuador').modal('hide');
		dispatch({ type: CERRAR_MODAL });
	}
}