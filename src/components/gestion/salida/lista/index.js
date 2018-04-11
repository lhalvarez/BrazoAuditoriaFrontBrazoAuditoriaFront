

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
import ReactTable from 'react-table';

import Encabezado from './encabezado';

import {NUMERICAS} from '../../../../constants';


/**
 * Sección de listado de partidas
 *
 * @author <a href="https://wiki.quarksoft.net/display/~cachavez">Carlos Chávez Melena</a>
 */


/**
 * Columnas de la lista de partidas
 *
 * @type {*[]}
 */
const columnas = [
  {
    Header: 'Caja',
    accessor: 'rfid',
    maxWidth: 150
  },
  {
    Header: 'Partida',
    accessor: 'folio',
    maxWidth: 150
  },
  {
    Header: 'Descripción',
    accessor: 'descripcion'
  },
  {
    Header: 'Fecha de salida',
    accessor: 'fechaSalida',
    maxWidth: 150
  }
];


/**
 * Se encargara de renderizar la parte de la lista de partias
 *
 * @param props Informacion para el componente
 *
 * @returns {*} Elementos graficos del componente
 */
const SalidaPartidasLista = (props) => {
  const actualizarLista = (p, t) => {
    props.actualizarLista(p, t)
  };

  const onFetchData = (state) => actualizarLista(state.page, state.pageSize);

  const cargando = props.actualizando;
  const datos = props.partidas.contenido;
  const paginas = props.partidas.totalPaginas;

  return (
    <div className='panel panel-default'>
      <Encabezado p={props.p} t={props.t} autoActualizarLista={props.autoActualizarLista} automatico={props.automatico}
                  faltantes={props.partidas.totalElementos} cargando={cargando} actualizarLista={actualizarLista}/>
      <div className='panel-body'>
          <ReactTable columns={columnas}
                      previousText='Anterior' nextText='Siguiente' loadingText='Cargando..' noDataText='Sin Partidas'
                      pageText='Pagina' ofText='de' rowsText='Filas'
                      manual
                      data={datos}
                      pages={paginas}
                      loading={cargando}
                      onFetchData={onFetchData}
                      defaultPageSize={NUMERICAS.GESTION.SALIDA.TABLE_PAGE_SIZE}
                      className='-striped -highlight'/>
      </div>
    </div>
  );
};

export default SalidaPartidasLista;
