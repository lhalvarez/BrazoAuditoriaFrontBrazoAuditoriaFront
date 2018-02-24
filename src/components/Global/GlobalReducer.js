import {ADD_NOTIFICATION} from './GlobalActions'


const initialState = {
  list: []
}


export function notification(state = initialState, action){

  switch(action.type){
    case ADD_NOTIFICATION:
      return Object.assign({}, state, {title: action.title, message: action.message, level: action.level})
    default:
      console.debug('funcion reductora de notificaciones :: enviando default', action.type);
      return state;

  }

}
