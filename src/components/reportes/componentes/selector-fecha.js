

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


/**
 *
 * @param event
 * @param props
 */
function manejadorCambio(event, props) {
  props.onChange(event.target.value, props.nombre);
}

function zeroTime(local) {
  return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
}

function toUTC(local) {
  return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
}

function maxDate() {
  let fecha = zeroTime(new Date());
  return toUTC(fecha).toISOString().split('T')[0];
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
           max={maxDate()}
           onChange={(event) => manejadorCambio(event, props)}/>
  );
}
