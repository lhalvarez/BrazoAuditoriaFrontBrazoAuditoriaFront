import {
  ADD_NOTIFICATION,
  CAMBIO_PAGINA,
  MUESTRA_AYUDA,
  OCULTA_AYUDA, SECCION_AYUDA
} from './GlobalActions'


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


/*
* Reducer encargado de mostrar actualizaciones de estado
* relacionadas con el panel de ayuda del sistema
*/

const helpInitialState = {
  showHelp: false,
  comentarioDTOList: [],
  nombreSeccion: '',

};

export function help(state = helpInitialState, action){

  let result = null;
  switch (action.type) {
    case MUESTRA_AYUDA:
      return Object.assign({},state,{showHelp: true});
    case OCULTA_AYUDA:
      return Object.assign({},state,{showHelp: false});
    case SECCION_AYUDA:
      result = action.payload ? { list: action.payload.object.comentarioDTOList,
        nombreSeccion: action.payload.object.seccion } : initialState;
      console.log("Se va a regregsar el result", result);
      return Object.assign({}, state, result);
    default:
      return state;
  }
}
