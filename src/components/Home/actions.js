
export const BUSCAR_USUARIO_SESION = 'BUSCAR_USUARIO_SESION';

const handleResponse = (dispatch, response, type) => {
  dispatch({ type: type, payload: response });
};

const handleError = (dispatch, err, type) => {
  dispatch({type: type, payload: null});
  if (err.data) {
    dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err.data.message, 'error'));
  } else {
    dispatch(addNotification(API.AVISOS.GLOBAL.error_consulta, err, 'error'));
  }
};

export function buscaDatosUsuarioSesion(){

  return (dispatch, getState) => {

    let {detalleUsuario} = getState().session;

    handleResponse(dispatch, detalleUsuario, BUSCAR_USUARIO_SESION);

  }

}
