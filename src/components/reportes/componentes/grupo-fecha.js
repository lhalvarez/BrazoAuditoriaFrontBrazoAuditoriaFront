

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

import SelectorFecha from  './selector-fecha';
import SelectorFechaPlugin from "./selector-fecha-plugin";

import {TITLES} from "../../../constants";


/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function GrupoFecha(props) {
  let manejadorCambio = (valor, nombre) => {
    props.manejadorCambioFecha(valor, nombre);

    document.getElementById('fechaInicio').setCustomValidity('');
    document.getElementById('fechaFin').setCustomValidity('');
  };

  return (
    <div id='grpFechas'
         className={'col-lg-9 form-group ' + props.cssErr}>
      <label htmlFor='fechaInicio'
             className='col-lg-3 control-label'>{TITLES.REPORTES.LBL_FECHA}</label>
      <div className='col-lg-9'>
        <div className='input-group'>
          <span className='input-group-addon'>
            <span className='fa fa-calendar'/>
          </span>
          {
            props.inputDate ?
              <SelectorFecha nombre='fechaInicio'
                             ancho='50%'
                             onChange={manejadorCambio}/>
              :
              <SelectorFechaPlugin nombre='fechaInicio'
                                   ancho='50%'
                                   onChange={manejadorCambio}/>
          }
          {
            props.inputDate ?
              <SelectorFecha nombre='fechaFin'
                             ancho='50%'
                             onChange={manejadorCambio}/>
              :
              <SelectorFechaPlugin nombre='fechaFin'
                                   ancho='50%'
                                   onChange={manejadorCambio}/>
          }
          <span className='input-group-addon asterisco-requerido'>
            <span className='fa fa-asterisk'/>
          </span>
        </div>
      </div>
    </div>
  );
}
