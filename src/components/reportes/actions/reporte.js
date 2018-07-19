

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


import HttpService from "../../../lib/utils/HttpService";

import {addNotification} from "../../Global/GlobalActions";

import {API, TITLES} from "../../../constants";


export const GENERAR_REPORTE_REQ = 'GENERAR_REPORTE_REQ';
export const GENERAR_REPORTE_RES = 'GENERAR_REPORTE_RES';

const AV_CAT = API.AVISOS.REPORTES.REPORTE;


function recuperarNombreArchivo(resultado, formato) {
  let filename = TITLES.REPORTES.DEF_FIL_NAME + formato;
  let contentDisposition = resultado.headers['content-disposition'];
  if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    let matches = filenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }

  return filename;
}

function recuperarContentType(resultado) {
  return resultado.headers['content-type'] ? resultado.headers['content-type'] : 'application/octet-stream';
}


/**
 *
 * @param data
 * @returns {Function}
 */
export function generarReporte(data) {
  return dispatch => {
    dispatch({type: GENERAR_REPORTE_REQ});

    HttpService.fetchBlob(API.ENDPOINTS.REPORTES.endpoint, data)
      .then(resultado => {
        let filename = recuperarNombreArchivo(resultado, data.formato);
        let contentType = recuperarContentType(resultado);
        let blob = new Blob([resultado.data], {type: contentType});

        if (typeof File === 'function') {
          try {
            blob = new File([resultado.data], filename, {type: contentType})
          } catch (error) {
            console.log('Error al crear el objeto File([blob], filename, {type})', error)
          }
        }

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blob, filename);
        } else {
          let URL = window.URL || window.webkitURL;
          let downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");

          if (typeof a.download === 'undefined') {
            window.location = downloadUrl;
          } else {
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }

          setTimeout(function () {
            URL.revokeObjectURL(downloadUrl);
          }, 100);
        }

        dispatch({type: GENERAR_REPORTE_RES});
        dispatch(addNotification(AV_CAT.TITULO, AV_CAT.MENSAJE.EXITO, 'success'));
      })
      .catch(error => {
        console.log('Ocurrio un error al descargar el reporte', error);
        dispatch({type: GENERAR_REPORTE_RES});
        dispatch(addNotification(AV_CAT.TITULO, AV_CAT.MENSAJE.ERROR, 'error'));
      });
  };
}
