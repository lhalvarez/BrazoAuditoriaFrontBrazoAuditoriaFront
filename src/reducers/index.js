import {combineReducers} from 'redux';
import {showUsuers} from '../components/ListaUsuarios/reducer';
import { notification, nav } from '../components/Global/GlobalReducer';
import {auditoriaReducer} from "../components/Auditoria/Fotografia/auditoriaReducer";
import { sessionReducer } from '../components/Session/reducer';
import { cargaAuditora } from '../components/CargaAuditorias/reducer';
import { cajaAbierta } from '../components/Auditoria/Fisica/CajaAbierta/reducer';
import {homeReducer} from '../components/Home/homeReducer';

const rootReducer = combineReducers({

  user: showUsuers,
  notification,
  auditoriaFotografia: auditoriaReducer,
  session: sessionReducer,
  cargaAuditora,
  nav,
  cajaAbierta,
  homeReducer: homeReducer

});

export default rootReducer;
