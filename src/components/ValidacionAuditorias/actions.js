
import { API } from '../../constants/index'
import { addNotification } from '../../components/Global/GlobalActions';
import { ADD_NOTIFICATION } from '../../components/Global/GlobalActions';
import MessageService from '../../lib/utils/MessageService';

export const GET_AUDITORIAS_PENDIENTES = 'GET_AUDITORIAS_PENDIENTES'; // Acción para obtener las auditorias pendientes
export const SAVE_AUDITORIA_PENDIENTE = 'SAVE_AUDITORIA_PENDIENTE'; //Acción para guardar los datos cuando se acepta un auditoria
export const GET_AUDITORIAS_PENDIENTES_CAJA = 'GET_AUDITORIAS_PENDIENTES_CAJA'; // Acción para obtener las auditorias pendientes


export function getAuditorias(idAuditoria, page, pageSize) {
    const params = {
        tipoAuditoria: idAuditoria,
        p: page,
        t: pageSize
    };
    return (dispatch) => {
        MessageService.getAll(API.ENDPOINTS.PARTIDAS.AUDITORIA_PENDIENTE.endpoint, params)
            .then((response) => {
                dispatch({ type: GET_AUDITORIAS_PENDIENTES, payload: response });
            }).catch(error => {
                dispatch(addNotification('Error', '' + error.data.message + '. Código:' + error.data.object.codigoError, 'error'));
            });
    }
}

export function getAuditoriasFisica(idAuditoria, page, pageSize) {
    const params = {
        tipoAuditoria: idAuditoria,
        p: page,
        t: pageSize
    };
    return (dispatch) => {
        MessageService.getAll(API.ENDPOINTS.PARTIDAS.AUDITORIA_PENDIENTE.endpoint, params)
            .then((response) => {
                dispatch({ type: GET_AUDITORIAS_PENDIENTES_CAJA, payload: response });
            }).catch(error => {
                dispatch(addNotification('Error', '' + error.data.message + '. Código:' + error.data.object.codigoError, 'error'));
            });
    }
}

export function saveAuditoria(data) {
    return (dispatch) => {
        MessageService.save(API.ENDPOINTS.PARTIDAS.VALIDAR_AUDITORIA.endpoint, data)
            .then((response) => {
                getAuditoriasFisica(0, 0, 10)(dispatch);
                getAuditorias(1, 0, 10)(dispatch);
                dispatch(addNotification('', 'Se ha guardado el registro exitósamente', 'success'));

            }).catch(error => {
                dispatch(addNotification('Error', '' + error.data.message + '. Código:' + error.data.object.codigoError, 'error'));
            });
    }
}

export function sendNotification(title, message, type) {
    return (dispatch) => {
        dispatch({ type: ADD_NOTIFICATION });
        dispatch(addNotification(title, message, type));
    }
}
