import {combineReducers} from 'redux';
import {showUsuers} from '../components/ListaUsuarios/reducer';
import {notification} from '../components/Global/GlobalReducer';
import {auditoriaReducer} from "../components/Auditoria/Fotografia/auditoriaReducer";
import { sessionReducer } from '../components/Session/reducer';
import { cargaAuditora } from '../containers/cargaAuditoria/reducer';

const rootReducer = combineReducers({

  user: showUsuers,
  notification,
  auditoriaFotografia: auditoriaReducer,
  session: sessionReducer,
  cargaAuditora

});

export default rootReducer;
