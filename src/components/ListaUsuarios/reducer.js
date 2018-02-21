import {CONSULTA_USUARIOS} from './actions'


const initialState = {
  list: []
}


export function showUsuers(state = initialState, action){

  switch(action.type){

    case CONSULTA_USUARIOS:
      return Object.assign({}, state, {list: action.payload})
    default:
      return state

  }

}
