

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

import ProgressBar from './progress-bar';

import {TITLES} from "../../../constants";


/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export default function GrupoGenerar(props) {
  return (
    <div className='col-lg-9 form-group'>
      <div className='pull-right'
           style={{paddingRight: '15px'}}>
        <input id='btnDescargar'
               className='btn btn-primary'
               type='submit'
               value={TITLES.REPORTES.LBL_BUTTON}
               disabled={props.activo}/>
        {
          props.progress && <ProgressBar/>
        }
      </div>
    </div>
  );
}
