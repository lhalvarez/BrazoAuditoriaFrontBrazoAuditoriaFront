import {combineReducers} from 'redux';
import {showUsuers} from '../components/ListaUsuarios/reducer';
import {notification} from '../components/Global/GlobalReducer';

const rootReducer = combineReducers({

  user: showUsuers,
  notification

});

export default rootReducer;
