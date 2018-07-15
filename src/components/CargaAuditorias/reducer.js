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
  UPDATE_PAGE,
  SHOW_ERROR_ALERT,
  CLOSE_ERROR_ALERT
  } from './actions'
import {ADD_NOTIFICATION} from "../Global/GlobalActions";


const initialState = {
  auditorias: [],
  documentos: [],
  auditoriaCreada: false,
  archivoCargado: false,
  resetTable: false,
  totalAuditorias: 0,
  resetFormCharge:false,
  showErrorAlert: false
}


export function cargaAuditora(state = initialState, action){

  switch(action.type){

    case GET_DOCS:
      return Object.assign({}, state, {
        documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: false,
        showErrorAlert: false
      })
    case GET_DOC:
      return Object.assign({}, state, {
        documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: false,
        showErrorAlert: false
      })
    case SAVE_DOC:
      return Object.assign({}, state, {
        // documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: true,
        resetTable: true,
        resetFormCharge:true,
        showErrorAlert: false
      })
    case DELETE_DOC:
      return Object.assign({}, state, {
        documentos: action.payload,
        auditoriaCreada: false,
        archivoCargado: false,
        resetTable: true,
        showErrorAlert: false
      })
    case GET_AUDITORIAS:
      return Object.assign({}, state, {
        auditorias: action.payload.object.contenido,
        auditoriaCreada: false,
        archivoCargado: false,
        totalAuditorias: action.payload.object.totalElementos,
        showErrorAlert: false
      })

    case GET_AUDITORIA:
      return Object.assign({}, state, {
        auditorias: action.payload,
        auditoriaCreada: false,
        archivoCargado: false,
        showErrorAlert: false
      })
    case SAVE_AUDITORIA:
      return Object.assign({}, state, {
        // auditorias: action.payload,
        auditoriaCreada: true,
        archivoCargado: false,
        showErrorAlert: false
      })
    case DELETE_AUDITORIA:
      return Object.assign({}, state, {
        auditorias: action.payload,
        auditoriaCreada: false,
        archivoCargado: false,
        resetTable: true,
        showErrorAlert: false
      })
    case 'ADD_NOTIFICATION':
      return Object.assign({}, state, {
        auditoriaCreada: false,
        archivoCargado: false
      });
    case CLOSE_MODAL:
      $('#modalConfirmacion').modal('hide');
      return Object.assign({}, state, {
        showErrorAlert: false
      });
    case NO_PARTIDAS:
      return {...initialState};
    case UPDATE_PAGE:
      return Object.assign({}, state, {
        resetTable: false,
        resetFormCharge:false
        // archivoCargado: false
      });
    case SHOW_ERROR_ALERT:
      return Object.assign({}, state, {
        showErrorAlert: true
      });
    case CLOSE_ERROR_ALERT:
      return Object.assign({}, state, {
        showErrorAlert: false
      });
    default:
      return state

  }

}
