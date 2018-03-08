
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