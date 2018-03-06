import {
  SAVE_DOC,
  GET_DOCS,
  DELETE_DOC,
  SAVE_AUDITORIA,
  EDIT_AUDITORIA,
  DELETE_AUDITORIA
  } from './actions'


const initialState = {
  list: []
}


export function cargaAuditora(state = initialState, action){

  switch(action.type){

    case GET_DOCS:
      return Object.assign({}, state, {list: action.payload})
    case SAVE_DOC:
      return Object.assign({}, state, {list: action.payload})
    default:
      return state

  }

}
