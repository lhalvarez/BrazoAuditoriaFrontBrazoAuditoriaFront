

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

import {TITLES, NUMERICAS} from '../../../../constants';

import "react-table/react-table.css";


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

  return (
    <div className='panel panel-default'>
      <Encabezado p={props.p}
                  t={props.t}
                  autoActualizarLista={props.autoActualizarLista}
                  automatico={props.automatico}
                  faltantes={props.partidas.totalElementos}
                  cargando={cargando}
                  actualizarLista={actualizarLista}
                  generarReporte={props.generarReporte}
                  descargando={props.descargando}/>
      <div className='panel-body'>
        <ReactTable columns={columnas}
                    previousText={TITLES.GESTION.SALIDA.LISTA.TABLA.ANTERIOR}
                    nextText={TITLES.GESTION.SALIDA.LISTA.TABLA.SIGUIENTE}
                    pageText={TITLES.GESTION.SALIDA.LISTA.TABLA.PAGINA}
                    ofText={TITLES.GESTION.SALIDA.LISTA.TABLA.DE}
                    rowsText={TITLES.GESTION.SALIDA.LISTA.TABLA.FILAS}
                    loadingText={TITLES.GESTION.SALIDA.LISTA.TABLA.CARGANDO}
                    noDataText={TITLES.GESTION.SALIDA.LISTA.TABLA.SIN_DATOS}
                    manual
                    data={props.partidas.contenido}
                    pages={props.partidas.totalPaginas}
                    loading={cargando}
                    onFetchData={onFetchData}
                    defaultPageSize={NUMERICAS.GESTION.SALIDA.TABLE_PAGE_SIZE}
                    className='-striped -highlight'/>
      </div>
    </div>
  );
};

export default SalidaPartidasLista;
