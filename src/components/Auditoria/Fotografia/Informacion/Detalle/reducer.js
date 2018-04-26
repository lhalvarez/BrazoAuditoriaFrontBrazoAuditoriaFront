import {GET_CAT_ESTADO_AUDITORIA, GET_PARTIDA_DETAIL} from './actions';


const initialState = {
  detallePartida: [],
  catalogoestadoAuditoria: []
}


export function detallePartida(state = initialState, action){
  switch(action.type){

    case GET_PARTIDA_DETAIL:
      return Object.assign({}, state, {detallePartida: action.payload.object});
    case GET_CAT_ESTADO_AUDITORIA:
      return Object.assign({}, state, {catalogoestadoAuditoria: action.payload.object});
    default:
      return state
  }

}
