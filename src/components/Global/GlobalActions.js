
/*
* Acciones utilizadas para las notificaciones en redux
* */
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export function addNotification(title, message, level) {

  return(dispatch, getState) => {

    dispatch( {type: ADD_NOTIFICATION,  title, message, level })

  }

}

/*
* Acciones relacionadas a la navegación del sistema
*/

export const CAMBIO_PAGINA = 'CAMBIO_PAGINA';

export function setPageTitle(pageTitle){
	return dispatch => dispatch({ type: CAMBIO_PAGINA, pageTitle });
}


/*
* Acciones relacionadas al panel de ayuda
*/

export const MUESTRA_AYUDA = 'MUESTRA_AYUDA';
export const OCULTA_AYUDA = 'OCULTA_AYUDA';

export function showHelpPane(){
	return dispatch => dispatch({ type: MUESTRA_AYUDA })
}

export function hideHelpPane(){
	return dispatch => dispatch({ type: OCULTA_AYUDA })
}