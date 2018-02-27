import {combineReducers} from 'redux';
import {showUsuers} from '../components/ListaUsuarios/reducer';
import {notification} from '../components/Global/GlobalReducer';
import {auditoriaReducer} from "../components/Auditoria/auditoriaReducer";

const rootReducer = combineReducers({

  user: showUsuers,
  notification,
  partidas: auditoriaReducer

});

export default rootReducer;
