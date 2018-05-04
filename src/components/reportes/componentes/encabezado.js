

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
 * Se encarga de renderizar la parte de encabezado de la sección de busqueda
 *
 * @returns {*} Elementos graficos del componente
 */
export default function Encabezado() {
  return (
    <div className='panel-heading'>
      <p>{TITLES.REPORTES.LEYENDA} <i className='fa fa-3x fa-bar-chart'/></p>
    </div>
  );
}
