

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
import SwitchButton from '../../../../../lib/utils/SwitchButton';

import {TITLES} from '../../../../../constants';


/**
 * Se encargara de renderizar el encabezado de la parte de la lista de partias
 *
 * @returns {*} Elementos graficos del componente
 */
export default function Encabezado(props) {
  const actualizarLista = (e) => {
    e.target.disabled = true;
    props.actualizarLista(props.p, props.t);
  };

  return (
    <div className='panel-heading'>
      <div className='row'>
        <div className='col-sm-6'>
          <p>
            {TITLES.GESTION.SALIDA.LISTA.LEYENDA} {props.faltantes}
          </p>
        </div>
        <div className='col-sm-6'>
          <div className='pull-right'>
            <div className='btn-group'>
              <button id='btnActualizar'
                      className='btn btn-sm btn-primary'
                      type='button'
                      disabled={props.cargando}
                      onClick={actualizarLista}>
                {TITLES.GESTION.SALIDA.LISTA.ACTUALIZAR}
              </button>
              <button data-toggle='dropdown'
                      className='btn btn-sm btn-primary dropdown-toggle'>
                <span className='caret'/>
              </button>
              <ul role='menu'
                  className='dropdown-menu'>
                <li>
                  <SwitchButton id='swtActualizar'
                                checked={props.automatico}
                                onChange={e => props.autoActualizarLista(e)}
                                labelRight={TITLES.GESTION.SALIDA.LISTA.AUTOMATICO}/>
                </li>
              </ul>
            </div>
            &nbsp;
            <button className='btn btn-sm btn-primary'
                    type='button'
                    disabled={props.descargando}
                    onClick={(event) => manejadorClickImprimirLista(event, props)}>
              {TITLES.GESTION.SALIDA.LISTA.IMPRIMIR_LIST}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function manejadorClickImprimirLista(event, props) {
  event.target.disabled = true;
  props.generarReporte(TITLES.GESTION.SALIDA.LISTA.TABLA.REPORTE);
}
