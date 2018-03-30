/*
* Acciones relacionadas a la Auditoría de Caja Abierta
*/
import { API, CONFIG } from '../../../../constants';
import MessageService from '../../../../lib/utils/MessageService';
import { addNotification } from '../../../Global/GlobalActions';

export const CARGAR_DETALLE_PARTIDA= 'CARGAR_DETALLE_PARTIDA';

export const CARGANDO_DETALLE_PARTIDA= 'CARGANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_CARGADA= 'DETALLE_PARTIDA_CARGADA';
export const ERROR_CARGAR_DETALLE_PARTIDA= 'ERROR_CARGAR_DETALLE_PARTIDA';

export function cargarDetallePartida(){
	return dispatch => dispatch({ type: CARGAR_DETALLE_PARTIDA })
}

export function obtenerDetallePartida(rfid,folio){
	return dispatch => {
		dispatch({ type: CARGANDO_DETALLE_PARTIDA });

		MessageService.getAll(`${API.ENDPOINTS.AUDITORIA.FISICA.CAJA_ABIERTA.DETALLE_PARTIDA.endpoint}/${rfid}/${folio}`)
		.then(response => {
			dispatch({ type: DETALLE_PARTIDA_CARGADA, ...response.object, rfid, folio });
			dispatch( addNotification(API.AVISOS.USUARIOS.consulta_exito,response.message,'success') );
		})
		.catch(error => {
			dispatch({ type: ERROR_CARGAR_DETALLE_PARTIDA });
			dispatch( addNotification(API.AVISOS.USUARIOS.error_consulta,error.data.message,'error') );
		});
	}
}