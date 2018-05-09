

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

import SelectorReporte from './selector-reporte';
import SelectorFormato from './selector-formato';

import {TITLES} from "../../../constants";


/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function GrupoReporte(props) {
  return (
    <div id='grpReportes'
         className={'col-lg-9 form-group ' + props.cssErr}>
      <label htmlFor='slcReporte'
             className='col-lg-3 control-label'>{TITLES.REPORTES.LBL_REPORTE}</label>
      <div className='col-lg-9'>
        <div className='input-group'>
          <span className='input-group-addon'>
            <span className='fa fa-bar-chart'/>
          </span>
          <SelectorReporte nombre='reporte'
                           elementos={props.reportes}
                           onChange={props.manejadorCambioReporte}/>
          <SelectorFormato nombre='formato'
                           elementos={props.formatos}
                           seleccionado={props.seleccionado}
                           onChange={props.manejadorCambioReporte}/>
          <span className='input-group-addon asterisco-requerido'>
            <span className='fa fa-asterisk'/>
          </span>
        </div>
      </div>
    </div>
  );
}
