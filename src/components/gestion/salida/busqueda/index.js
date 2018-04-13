

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

import Encabezado from './encabezado';
import Rfid from './rfid';
import Folio from './folio';
import EjecutarSalida from './ejecutarSalida';

import {manejadorClickEjecutarSalida} from './util';


/**
 * Sección de busqueda de partidas
 *
 * @author <a href="https://wiki.quarksoft.net/display/~cachavez">Carlos Chávez Melena</a>
 */


/**
 * Se encargara de renderizar la parte de busqueda de partias
 *
 * @param props Informacion para el componente
 *
 * @returns {*} Elementos graficos del componente
 */
const SalidaPartidasBusqueda = (props) => {
  return (
    <div className='panel panel-default'>
      <Encabezado/>
      <div className='panel-body'>
        <form onSubmit={e => manejadorClickEjecutarSalida(e, props)} autoComplete='off'>
          <Rfid rfid={props.rfid} errorParametros={props.errorParametros}/>
          <Folio folio={props.folio} errorParametros={props.errorParametros}/>
          <EjecutarSalida ejecutando={props.ejecutando}/>
        </form>
      </div>
    </div>
  );
};

export default SalidaPartidasBusqueda;
