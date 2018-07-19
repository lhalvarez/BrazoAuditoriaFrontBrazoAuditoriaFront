import { API } from '../../../constants/index'
import HttpService from '../../../lib/utils/HttpService';
import {addNotification} from "../../Global/GlobalActions";

export const PAGINAR_PARTIDAS = 'PAGINAR_PARTIDAS';
export const BUSQUEDA_PARTIDAS = 'BUSQUEDA_PARTIDAS';
export const PAGINAR_AUDITORIAS = 'PAGINAR_AUDITORIAS';
export const BUSQUEDA_AUDITORIAS = 'BUSQUEDA_AUDITORIAS';

const handleResponse = (dispatch, response, type) => {
    console.log('Entregando la respuesta', response);
    dispatch({ type: type, payload: response });
};

const handleError = (dispatch, err, type) => {
    console.log(`Error al procesar la peticion`);
    if (err.data) {
        dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err.data.message, 'error'));
    } else {
        dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err, 'error'));
    }
    dispatch({type: type, payload: null});

};

export function paginarResultados (idAuditoria, page, pageSize) {
    const params = {
        p: page,
        t: pageSize
    };

    return (dispatch) => {
      HttpService.get(API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.PARTIDAS.PAGINADO.endpoint.replace(":idAuditoria", idAuditoria.toString()), params)
        .then((response) => {
            handleResponse(dispatch, response, PAGINAR_PARTIDAS);
            dispatch(addNotification(API.AVISOS.GLOBAL.consulta_exitosa, API.AVISOS.PARTIDAS.AUDITORIA_FOTOGRAFIA.registros_obtenidos, 'info'));
        }).catch((err) => {
            handleError(dispatch, err, PAGINAR_PARTIDAS);
        });
    }
}

export function buscarPartida(idAuditoria, folio) {
    return (dispatch) => {
      HttpService.getById(API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.PARTIDAS.BUSQUEDA.endpoint.replace(":idAuditoria", idAuditoria.toString()), folio)
        .then((response) => {
            handleResponse(dispatch, response, BUSQUEDA_PARTIDAS);
            dispatch(addNotification(API.AVISOS.GLOBAL.consulta_exitosa, API.AVISOS.PARTIDAS.AUDITORIA_FOTOGRAFIA.partida_encontrada, 'success'));
        }).catch((err) => {
            handleError(dispatch, err, BUSQUEDA_PARTIDAS);
        });
    }
}

export function paginarAuditorias(page, pageSize) {
    // todo: verificar con que nombre se esperan cada uno de los parametros en el endpoint de paginado
    const params = {
        p: page,
        t: pageSize,
        tipoAudit: 1
    };

    return (dispatch) => {
      HttpService.get(API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.AUDITORIAS.PAGINADO.endpoint, params)
        .then((response) => {
            handleResponse(dispatch, response, PAGINAR_AUDITORIAS);
            dispatch(addNotification(API.AVISOS.GLOBAL.consulta_exitosa, API.AVISOS.PARTIDAS.AUDITORIA_FOTOGRAFIA.registros_obtenidos, 'info'));
        }).catch((err) => {
            handleError(dispatch, err, PAGINAR_AUDITORIAS);
        });
    }
}

export function buscarAuditoria(idAuditoria, nombreArchivo) {
    const endpoints = API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.AUDITORIAS.BUSQUEDA;
    let endpoint = null, param = null;

    if (idAuditoria) {
        endpoint = endpoints.ID.endpoint;
        param = idAuditoria;
    } else if (nombreArchivo) {
        endpoint = endpoints.ARCHIVO.endpoint;
        param = nombreArchivo;
    }

    return (dispatch) => {
      HttpService.getById(endpoint, param)
        .then((response) => {
            handleResponse(dispatch, response, BUSQUEDA_AUDITORIAS);
            dispatch(addNotification(API.AVISOS.GLOBAL.consulta_exitosa, API.AVISOS.PARTIDAS.AUDITORIA_FOTOGRAFIA.auditoria_encontrada, 'success'));
        }).catch((err) => {
            handleError(dispatch, err, BUSQUEDA_AUDITORIAS);
        });
    }
}
