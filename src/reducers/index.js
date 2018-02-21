import {combineReducers} from 'redux';
import {showUsuers} from '../components/ListaUsuarios/reducer'

const rootReducer = combineReducers({

  user: showUsuers

});

export default rootReducer;
