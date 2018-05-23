import {GET_CAT_ESTADO_AUDITORIA,
  DETALLE_PARTIDA_ENVIADA,
  ENVIANDO_DETALLE_PARTIDA,
  GET_PARTIDA_DETAIL,
  FLUSH_DETALLE_PART} from './actions';


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
    case ENVIANDO_DETALLE_PARTIDA:
      return Object.assign({}, state, {detallePartida: action.detallePartida});
    case DETALLE_PARTIDA_ENVIADA:
      return {...initialState};
    case FLUSH_DETALLE_PART:
      return {...initialState};
    default:
      return state
  }

}
