

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

import {cambiarFoco, setCSSErrorGroup} from './util';
import {TITLES} from "../../../../constants";


/**
 * Se encarga de renderizar la parte para capturar el Folio de la sección de busqueda
 *
 * @param props Informacion para el componente
 *
 * @returns {*} Elementos graficos del componente
 */
export default function Folio(props) {
  return (
    <div id="groupFolio"
         className={props.estilo}>
      <label htmlFor='inputFolio'
             className='col-lg-4 control-label'>
        {TITLES.GESTION.SALIDA.BUSQUEDA.NUM_PARTIDA}
      </label>
      <div className='col-lg-8'>
        <div className='input-group'>
          <input id='inputFolio'
                 name='inputFolio'
                 className='form-control'
                 placeholder={TITLES.GESTION.SALIDA.BUSQUEDA.FOLIO}
                 type='number'
                 required={true}
                 min='1'
                 max='999999999'
                 defaultValue={props.folio}
                 onKeyDown={cambiarFoco}
                 onInvalid={() => setCSSErrorGroup('groupFolio')}/>
          <span className='input-group-addon' style={{color: '#ff0000'}}>
            <span className="glyphicon glyphicon-asterisk"/>
          </span>
        </div>
      </div>
    </div>
  );
}
