import {
    GET_AUDITORIAS_PENDIENTES,
    SAVE_AUDITORIA_PENDIENTE,
    GET_AUDITORIAS_PENDIENTES_CAJA
} from './actions'

import { ADD_NOTIFICATION } from "../Global/GlobalActions";


const initialState = {
    auditoriasPendientes: [],
    auditoriasPendientesCaja: [],
    total: 0,
    totalACaja: 0
}


export function validacionAuditora(state = initialState, action) {

    switch (action.type) {

        case GET_AUDITORIAS_PENDIENTES:
            return Object.assign({}, state, {
                auditoriasPendientes: action.payload.object.contenido,
                total: action.payload.object.totalElementos
            })
        case GET_AUDITORIAS_PENDIENTES_CAJA:
            return Object.assign({}, state, {
                auditoriasPendientesCaja: action.payload.object.contenido,
                totalACaja: action.payload.object.totalElementos
            })
        case SAVE_AUDITORIA_PENDIENTE:
            return Object.assign({}, state, { auditoriasPendientes: action.payload })
        case ADD_NOTIFICATION:
            return Object.assign({}, state, {})
        default:
            return state

    }

}
