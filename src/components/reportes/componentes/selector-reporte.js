

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
 * @param elemento
 * @param indice
 * @returns {*}
 */
function opcionesReportes(elemento, indice) {
  return (
    <option key={indice}
            value={indice}>
      {elemento.descripcionCorta} - {elemento.descripcion}
    </option>
  );
}

/**
 *
 * @param event
 * @param props
 */
function manejadorCambio(event, props) {
  let valor = event.target.value;
  let indice = parseInt(valor);

  props.onChange(isNaN(indice) ? -1 : indice, props.nombre);
}

/**
 *
 * @param props
 * @returns {*}
 */
function getSelect(props) {
  return (
    <select id='slcReporte'
            name={props.nombre}
            autoFocus
            required={true}
            className='form-control'
            onChange={event => manejadorCambio(event, props)}>
      <option value=''>{TITLES.REPORTES.DEF_REPORTE}</option>
      {
        props.elementos.map(opcionesReportes)
      }
    </select>
  );
}

/**
 *
 * @returns {*}
 */
function getLoaderSelect() {
  return (
    <div className='wrapper icono-formato-reporte'>
      <span className='fa fa-refresh fa-spin icon-select'/>
      <select className='form-control' required={true} disabled={true}>
      </select>
    </div>
  );
}

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function SelectorReporte(props) {
  return (
    <div>
      {
        props.elementos[0] ? getSelect(props) : getLoaderSelect()
      }
    </div>
  );
}
