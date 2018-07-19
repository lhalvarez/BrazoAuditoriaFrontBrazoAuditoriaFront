

/*
 *
 *
 *
 * <p><a href="https://wiki.quarksoft.net/display/Auditoria/Home">Auditoria - Backend</a></p>
 *
 * <p><b><a href="https://quarksoft.net/">Quarksoft S.A.P.I. de C.V. Copyrigth © 2018</a></b></p>
 *
 *
 */


import {API, CATALOGOS} from "../../../constants";
import HttpService from "../../../lib/utils/HttpService";
import {addNotification} from "../../Global/GlobalActions";


export const RECUPERAR_CATALOGOS_REPORTES = 'RECUPERAR_CATALOGOS_REPORTES';

const AV_CAT = API.AVISOS.REPORTES.CATALOGO;
const LE_ERR = 'error';
const LE_INF = 'info';

/**
 *
 * @param dispatch
 * @param type
 * @param payload
 */
function lanzarEvento(dispatch, type, payload) {
  dispatch({type, payload});
}


/**
 *
 * @param catalogo
 * @param dispatch
 */
function realizarPeticion(catalogo, dispatch) {
  const payload = {};
  const ERR = `err${catalogo}`;
  payload[ERR] = false;

  HttpService.getById(API.ENDPOINTS.CATALOGOS.BUSCAR_CATALOGO.endpoint, catalogo)
    .then(resultado => {
      payload[catalogo] = resultado.object.registros;
      lanzarEvento(dispatch, RECUPERAR_CATALOGOS_REPORTES, payload);
      dispatch(addNotification(AV_CAT.TITULO,  AV_CAT.MENSAJE.EXITO + ' ' + catalogo, LE_INF));
    })
    .catch(error => {
      console.error(`Ocurrio un error al recuperar los elementos del catalogo ${catalogo}`, error);
      payload[ERR] = true;
      lanzarEvento(dispatch, RECUPERAR_CATALOGOS_REPORTES, payload);
      dispatch(addNotification(AV_CAT.TITULO, AV_CAT.MENSAJE.ERROR + ' ' + catalogo, LE_ERR));
    });
}


/**
 * Se encarga de realizar la solicitud para recuperar los catalogos necesario (Reporte y Formato)
 *
 * @returns {Function}
 */
export function recuperarCatalogos(catalogo = undefined) {
  return dispatch => {
    if (catalogo) {
      realizarPeticion(catalogo, dispatch);
    } else {
      realizarPeticion(CATALOGOS.REPORTES, dispatch);
      realizarPeticion(CATALOGOS.FORMATO, dispatch);
    }
  };
}
