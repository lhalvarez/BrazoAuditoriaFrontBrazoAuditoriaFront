

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
import {cambiarFoco, setCSSErrorGroup} from './util';


/**
 * Se encarga de renderizar la parte para capturar el Rfid de la sección de busqueda
 *
 * @param props Informacion para el componente
 *
 * @returns {*} Elementos graficos del componente
 */
export default function Rfid(props) {
  return (
    <div id="groupRfid"
         className={props.estilo}>
      <label htmlFor='inputCaja'
             className='col-lg-4 control-label'>
        {TITLES.GESTION.SALIDA.BUSQUEDA.NUM_CAJA}
      </label>
      <div className='col-lg-8'>
        <div className='input-group'>
          <input id='inputCaja'
                 name='inputCaja'
                 className='form-control'
                 placeholder={TITLES.GESTION.SALIDA.BUSQUEDA.RFID}
                 type='number'
                 required={true}
                 min='1'
                 max='999999999'
                 defaultValue={props.rfid}
                 autoFocus
                 onKeyDown={cambiarFoco}
                 onInvalid={() => setCSSErrorGroup('groupRfid')}/>
          <span className='input-group-addon' style={{color: '#ff0000'}}>
            <span className="fa fa-asterisk"/>
          </span>
        </div>
      </div>
    </div>
  );
}
