/*
* Acciones relacionadas a la Auditoría de Caja Abierta
*/
import { API, CATALOGOS } from '../../../../constants';
import MessageService from '../../../../lib/utils/MessageService';
import { addNotification } from '../../../Global/GlobalActions';

export const CARGAR_DETALLE_PARTIDA= 'CARGAR_DETALLE_PARTIDA';

export const CARGANDO_DETALLE_PARTIDA= 'CARGANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_CARGADA= 'DETALLE_PARTIDA_CARGADA';
export const ERROR_CARGAR_DETALLE_PARTIDA= 'ERROR_CARGAR_DETALLE_PARTIDA';

export const ENVIANDO_DETALLE_PARTIDA = 'ENVIANDO_DETALLE_PARTIDA';
export const DETALLE_PARTIDA_ENVIADA = 'DETALLE_PARTIDA_ENVIADA';
export const ERROR_ENVIAR_DETALLE_PARTIDA = 'ERROR_ENVIAR_DETALLE_PARTIDA';

export const LIMPIAR_PARTIDA = 'LIMPIAR_PARTIDA';

const PARAM_FILTRO_CAT_EST = {
  f: 'ESTATUS_RESULTADO_TIPO_AUDITORIA',
  p: 3
};

export function cargarDetallePartida(){
	return dispatch => dispatch({ type: CARGAR_DETALLE_PARTIDA })
}

export function obtenerDetallePartida(rfid,folio){
	return dispatch => {
		dispatch({ type: CARGANDO_DETALLE_PARTIDA });

		MessageService.getAll(`${API.ENDPOINTS.AUDITORIA.FISICA.CAJA_ABIERTA.DETALLE_PARTIDA.endpoint}/${rfid}/${folio}/3`)
		.then(response => {
			MessageService.getAll(`${API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint}/${CATALOGOS.ESTATUS}`, PARAM_FILTRO_CAT_EST)
			.then(catResponse => {
				dispatch({ type: DETALLE_PARTIDA_CARGADA, ...response.object, rfid, folio, tiposObservacion: catResponse.object.registros });
				dispatch( addNotification(API.AVISOS.GLOBAL.consulta_exitosa,response.message,'success') );
			})
			.catch(error => {
				dispatch({ type: ERROR_CARGAR_DETALLE_PARTIDA });
				dispatch( addNotification(API.AVISOS.GLOBAL.error_consulta,error.data.message,'error') );
			});

		})
		.catch(error => {
			dispatch({ type: ERROR_CARGAR_DETALLE_PARTIDA });
			dispatch( addNotification(API.AVISOS.GLOBAL.error_consulta,error.data.message,'error') );
		});
	}
}

export function enviarDetallePartida(requestBody){
	return dispatch => {
		dispatch({ type: ENVIANDO_DETALLE_PARTIDA, detallePartida: requestBody.cajaAbierta });

		MessageService.save(API.ENDPOINTS.AUDITORIA.RESULTADO.endpoint,requestBody)
		.then(response => {
			dispatch({ type: DETALLE_PARTIDA_ENVIADA });
			dispatch( addNotification(API.AVISOS.GLOBAL.consulta_exitosa,response.message,'success') );
		})
		.catch(error => {
			dispatch({ type: ERROR_ENVIAR_DETALLE_PARTIDA, detallePartida: requestBody.cajaAbierta });
			dispatch( addNotification(error.data.object.descripcionError,error.data.message,'error') );
		});

	};
}

export function limpiarPartida(){
	return dispatch => dispatch({ type: LIMPIAR_PARTIDA })
}