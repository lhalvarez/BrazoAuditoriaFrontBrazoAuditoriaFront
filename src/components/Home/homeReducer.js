import {BUSCAR_USUARIO_SESION} from './actions'

const initialState = {
  usuario: [],
  dashboard:[]
};

export function homeReducer(state = initialState, action) {

  let result = null;

  switch (action.type) {

    case BUSCAR_USUARIO_SESION:
      result = action.payload ? { usuario: action.payload.usuario, dashboard: action.payload.object } : initialState;
      return Object.assign({}, state, result);
    default:
      return state

  }


}
