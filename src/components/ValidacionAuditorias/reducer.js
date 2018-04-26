import {
    GET_AUDITORIAS_PENDIENTES,
    SAVE_AUDITORIA_PENDIENTE,
} from './actions'
import { ADD_NOTIFICATION } from "../Global/GlobalActions";


const initialState = {
    auditoriasPendientes: []
}


export function validacionAuditora(state = initialState, action) {

    switch (action.type) {

        case GET_AUDITORIAS_PENDIENTES:
            return Object.assign({}, state, { auditorias: action.payload.object.contenido })
        case SAVE_AUDITORIA_PENDIENTE:
            return Object.assign({}, state, { auditoriasPendientes: action.payload })
        case ADD_NOTIFICATION:
            return Object.assign({}, state, {})
        default:
            return state

    }

}
