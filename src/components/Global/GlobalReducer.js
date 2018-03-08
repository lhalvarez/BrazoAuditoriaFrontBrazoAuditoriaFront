import { ADD_NOTIFICATION, CAMBIO_PAGINA } from './GlobalActions'


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

/*
* Reducer encargado de mostrar actualizaciones de estado 
* relacionadas con la navegación del sistema 
*/

const navInitialState = {
	pageTitle : 'Nacional Monte de Piedad'
};

export function nav(state = navInitialState, action){
	switch (action.type) {
		case CAMBIO_PAGINA:
			return Object.assign({},state,{pageTitle: action.pageTitle});
		default:
			return state;
	}
}
