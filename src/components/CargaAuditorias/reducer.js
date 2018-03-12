import {
  GET_DOCS,
  GET_DOC,
  SAVE_DOC,
  DELETE_DOC,
  GET_AUDITORIAS,
  GET_AUDITORIA,
  SAVE_AUDITORIA,
  EDIT_AUDITORIA,
  DELETE_AUDITORIA
  } from './actions'


const initialState = {
  auditorias: [],
  documentos: []
}


export function cargaAuditora(state = initialState, action){

  switch(action.type){

    case GET_DOCS:
      return Object.assign({}, state, {documentos: action.payload})
    case GET_DOC:
      return Object.assign({}, state, {documentos: action.payload})
    case SAVE_DOC:
      return Object.assign({}, state, {documentos: action.payload})
    case DELETE_DOC:
      return Object.assign({}, state, {documentos: action.payload})
    case GET_AUDITORIAS:
      return Object.assign({}, state, {auditorias: action.payload})
    case GET_AUDITORIA:
      return Object.assign({}, state, {auditorias: action.payload})
    case SAVE_AUDITORIA:
      return Object.assign({}, state, {auditorias: action.payload})
    case EDIT_AUDITORIA:
      return Object.assign({}, state, {auditorias: action.payload})
    case DELETE_AUDITORIA:
      return Object.assign({}, state, {auditorias: action.payload})
    default:
      return state

  }

}
