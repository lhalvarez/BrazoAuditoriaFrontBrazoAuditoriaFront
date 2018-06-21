import {
  GET_DOCS,
  GET_DOC,
  SAVE_DOC,
  DELETE_DOC,
  GET_AUDITORIAS,
  GET_AUDITORIA,
  SAVE_AUDITORIA,
  DELETE_AUDITORIA,
  CLOSE_MODAL,
  NO_PARTIDAS,
  UPDATE_PAGE
  } from './actions'
import {ADD_NOTIFICATION} from "../Global/GlobalActions";


const initialState = {
  auditorias: [],
  documentos: [],
  auditoriaCreada: false,
  archivoCargado: false,
  resetTable: false,
  totalAuditorias: 0
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
        archivoCargado: true,
        resetTable: true
      })
    case DELETE_DOC:
      return Object.assign({}, state, {
        documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: false,
        resetTable: true
      })
    case GET_AUDITORIAS:
      return Object.assign({}, state, {
        auditorias: action.payload.object.contenido,
        auditoriaCreada: false,
        archivoCargado: false,
        totalAuditorias: action.payload.object.totalElementos
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
        archivoCargado: false,
      })
    case DELETE_AUDITORIA:
      return Object.assign({}, state, {
        auditorias: action.payload,
        auditoriaCreada: false,
        archivoCargado: false,
        resetTable: true,
      })
    case 'ADD_NOTIFICATION':
      return Object.assign({}, state, {
        auditoriaCreada: false,
        archivoCargado: false
      });
    case CLOSE_MODAL:
      $('#modalConfirmacion').modal('hide');
      return Object.assign({}, state, {

      });
    case NO_PARTIDAS:
      return {...initialState};
    case UPDATE_PAGE:
      return Object.assign({}, state, {
        resetTable: false
      });
    default:
      return state

  }

}
