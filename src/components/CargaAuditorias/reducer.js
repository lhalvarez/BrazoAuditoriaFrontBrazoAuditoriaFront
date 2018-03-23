import {
  GET_DOCS,
  GET_DOC,
  SAVE_DOC,
  DELETE_DOC,
  GET_AUDITORIAS,
  GET_AUDITORIA,
  SAVE_AUDITORIA,
  DELETE_AUDITORIA
  } from './actions'
import {ADD_NOTIFICATION} from "../Global/GlobalActions";


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
      return Object.assign({}, state, {auditorias: action.payload.object.contenido})
    case GET_AUDITORIA:
      return Object.assign({}, state, {auditorias: action.payload})
    case SAVE_AUDITORIA:
      return Object.assign({}, state, {auditorias: action.payload})
    case DELETE_AUDITORIA:
      return Object.assign({}, state, {auditorias: action.payload})
    case 'ADD_NOTIFICATION':
      return Object.assign({}, state, {})
    default:
      return state

  }

}
