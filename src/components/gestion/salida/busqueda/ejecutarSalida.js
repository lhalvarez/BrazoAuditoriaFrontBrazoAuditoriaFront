

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


import React from 'react';
import {TITLES} from "../../../../constants";


function resetValidation() {
  document.getElementById('inputCaja').setCustomValidity('');
  document.getElementById('inputFolio').setCustomValidity('');
}

/**
 * Se encarga de renderizar la parte para capturar el Folio de la sección de busqueda
 *
 * @param props Informacion para el componente
 *
 * @returns {*} Elementos graficos del componente
 */
export default function EjecutarSalida(props) {
  return (
    <div className='col-lg-2 form-group padding-btn-ejecutar-salida'>
      <div className='alineacion-btn-ejecutar-salida'>
      <input id='btnEjecutarSalida'
             className='btn btn-sm btn-primary'
             type='submit'
             disabled={props.ejecutando}
             onClick={resetValidation}
             value={TITLES.GESTION.SALIDA.BUSQUEDA.EJEC_SALIDA}/>
      </div>
    </div>
  );
}
