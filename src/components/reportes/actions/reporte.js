

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



import {API} from "../../../constants";
import MessageService from "../../../lib/utils/MessageService";
import {addNotification} from "../../Global/GlobalActions";


export const GENERAR_REPORTE_REQ = 'GENERAR_REPORTE_REQ';
export const GENERAR_REPORTE_RES = 'GENERAR_REPORTE_RES';


/**
 *
 * @param data
 * @returns {Function}
 */
export function generarReporte(data) {
  return dispatch => {
    dispatch({type: GENERAR_REPORTE_REQ});

    MessageService.fetchBlob(API.ENDPOINTS.REPORTES.endpoint, data)
      .then(resultado => {
        let filename = 'reporte.pdf';
        let blob = new Blob([resultado], {type: 'application/octet-stream'});

        if (typeof File === 'function') {
          try {
            blob = new File([resultado], filename, {type: 'application/octet-stream'})
          } catch (error) {
            console.log('Error al crear el objeto File([blob], filename, {type})', error)
          }
        }

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blob, filename);
        } else {
          let URL = window.URL || window.webkitURL;
          let downloadUrl = URL.createObjectURL(blob);

          if (filename) {
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
          } else {
            window.location = downloadUrl;
          }

          setTimeout(function () {
            URL.revokeObjectURL(downloadUrl);
          }, 100);
        }

        dispatch({type: GENERAR_REPORTE_RES});
        dispatch(addNotification('Generar Reporte', 'Reporte generado correctamente', 'success'));
      })
      .catch(error => {
        console.log('Ocurrio un error al descargar el reporte', error);
        dispatch({type: GENERAR_REPORTE_RES});
        dispatch(addNotification('Generar Reporte', 'Ocurrio un error al generar el reporte', 'error'));
      });
  };
}
