import { API } from '../../constants/index'
import MessageService from '../../lib/utils/MessageService';
import {addNotification} from "../Global/GlobalActions";

export const PAGINAR_PARTIDAS = 'PAGINAR_PARTIDAS';
export const BUSQUEDA_PARTIDAS = 'BUSQUEDA_PARTIDAS';

export function paginarResultados (page, pageSize) {
    const params = {
        page: page,
        size: pageSize
    };

    return (dispatch) => {
        MessageService.getAll(API.ENDPOINTS.PARTIDAS.AUDITORIA_FOTOGRAFIA.PAGINADO.endpoint, params)
        .then((response) => {
            console.log('Entregando la respuesta', response);
            dispatch({ type: PAGINAR_PARTIDAS, payload: response });
            dispatch(addNotification(API.AVISOS.GLOBAL.consulta_exitosa, API.AVISOS.PARTIDAS.AUDITORIA_FOTOGRAFIA.registros_obtenidos, 'info'));
        }).catch((err) => {
            console.log(`Error al procesar la peticion`);
            if (err.data) {
                dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err.data.message, 'error'));
            } else {
                dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err, 'error'));
            }
        });
    }
}

export function buscarPartida(folio) {
    return (dispatch) => {
        MessageService.getById(API.ENDPOINTS.PARTIDAS.AUDITORIA_FOTOGRAFIA.BUSQUEDA.endpoint, folio)
        .then((response) => {
            console.log("Entragando la respuesta", response);
            dispatch({ type: BUSQUEDA_PARTIDAS, payload: response });
            dispatch(addNotification(API.AVISOS.GLOBAL.consulta_exitosa, API.AVISOS.PARTIDAS.AUDITORIA_FOTOGRAFIA.partida_encontrada, 'success'));
        }).catch((err) => {
            console.log(`Error al procesar la peticion`);
            if (err.data) {
                dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err.data.message, 'error'));
            } else {
                dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err, 'error'));
            }
        });
    }
}
