import {GET_DOCS} from './actions'


const initialState = {
  list: []
}


export function showDocs(state = initialState, action){

  switch(action.type){

    case GET_DOCS:
      return Object.assign({}, state, {list: action.payload})
    default:
      return state

  }

}
