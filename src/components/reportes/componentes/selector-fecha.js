

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

import {TITLES} from "../../../constants/index";


/**
 *
 * @param event
 * @param props
 */
function manejadorCambio(event, props) {
  const HOY = new Date();
  const SELECCION = new Date(event.target.value);

  event.target.setCustomValidity('');

  if (SELECCION > HOY) {
    event.preventDefault();
    event.target.value = '';
    event.target.setCustomValidity(TITLES.REPORTES.ERR_FECHA_FUT);

    if (event.target.reportValidity) {
      event.target.reportValidity();
    }
  } else {
    props.onChange(event.target.value, props.nombre);
  }
}


/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function SelectorFecha(props) {
  const STYLE = props.ancho ? {width: props.ancho} : {};

  return (
    <input id={props.nombre}
           name={props.nombre}
           type='date'
           className='form-control'
           required={true}
           style={STYLE}
           onChange={(event) => manejadorCambio(event, props)}/>
  );
}
