
/*
* Acciones utilizadas para las notificaciones en redux
* */
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export function addNotification(title, message, level) {

  return(dispatch, getState) => {

    dispatch( {type: ADD_NOTIFICATION,  title, message, level })

  }

}

