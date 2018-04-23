import { combineReducers } from 'redux';
import { showUsuers } from '../components/ListaUsuarios/reducer';
import { notification, nav, help } from '../components/Global/GlobalReducer';
import { auditoriaReducer } from "../components/Auditoria/Fotografia/auditoriaReducer";
import { sessionReducer } from '../components/Session/reducer';
import { cargaAuditora } from '../components/CargaAuditorias/reducer';
import { cajaAbierta } from '../components/Auditoria/Fisica/CajaAbierta/reducer';
import salidaPartidas from '../components/gestion/salida/salida-reducer';
import { homeReducer } from '../components/Home/homeReducer';
import { validacionAuditora } from '../components/ValidacionAuditorias/reducer'
import { firmaValuador } from '../components/Auditoria/Fisica/FirmaValuador/reducer'
import { detallePartida } from '../components/Auditoria/Fotografia/Informacion/Detalle/reducer';

const rootReducer = combineReducers({

  user: showUsuers,
  notification,
  auditoriaFotografia: auditoriaReducer,
  session: sessionReducer,
  cargaAuditora,
  nav,
  cajaAbierta,
  salidaPartidas,
  homeReducer: homeReducer,
  validacionAuditora,
  firmaValuador,
  detallePartida,
  help

});

export default rootReducer;
