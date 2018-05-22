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
  documentos: [],
  auditoriaCreada: false,
  archivoCargado: false
}


export function cargaAuditora(state = initialState, action){

  switch(action.type){

    case GET_DOCS:
      return Object.assign({}, state, {
        documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: false
      })
    case GET_DOC:
      return Object.assign({}, state, {
        documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: false
      })
    case SAVE_DOC:
      return Object.assign({}, state, {
        // documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: true
      })
    case DELETE_DOC:
      return Object.assign({}, state, {
        documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: false
      })
    case GET_AUDITORIAS:
      return Object.assign({}, state, {
        auditorias: action.payload.object.contenido,
        auditoriaCreada: false,
        archivoCargado: false
      })
    case GET_AUDITORIA:
      return Object.assign({}, state, {
        auditorias: action.payload,
        auditoriaCreada: false,
        archivoCargado: false
      })
    case SAVE_AUDITORIA:
      return Object.assign({}, state, {
        // auditorias: action.payload,
        auditoriaCreada: true,
        archivoCargado: false
      })
    case DELETE_AUDITORIA:
      return Object.assign({}, state, {
        auditorias: action.payload,
        auditoriaCreada: false,
        archivoCargado: false
      })
    case 'ADD_NOTIFICATION':
      return Object.assign({}, state, {
        auditoriaCreada: false,
        archivoCargado: false
      })
    default:
      return state

  }

}
