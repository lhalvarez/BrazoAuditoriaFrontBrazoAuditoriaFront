

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


const CLS_NAME = 'icono-formato-reporte fa-fw ';
const CLS_NAME_FAR = ' far ';


/**
 * Se encarga de generar las opciones de acuerdo al numero de formatos en el catálogo
 *
 * @param elemento Elemento
 * @param indice Indice del elemento
 * @param props Metodo que manejara los eventos de cambio de seleccion
 *
 * @returns {*}
 */
function opcionesFormato(elemento, indice, props) {
  return (
    <li key={indice}>
      <a style={{cursor: 'pointer'}} onClick={() => props.onChange(indice, props.nombre)}>
        <span className={CLS_NAME + CLS_NAME_FAR + elemento.descripcion}/> {elemento.descripcionCorta}
      </a>
    </li>
  );
}


/**
 * Metodo que se encarga de crear los elementos graficos para seleccionar un tipo de formato
 *
 * @param props Propiedades del componente
 *
 * @returns {*}
 */
export default function SelectorFormato(props) {
  return (
    <span className='input-group-btn'>
      <button id='dropdownMenu1'
              name={props.nombre}
              type='button'
              data-toggle='dropdown'
              disabled={!props.elementos.length}
              aria-haspopup='true'
              aria-expanded='false'
              className='btn btn-default dropdown-toggle'>
        <span className={CLS_NAME + (props.seleccionado ? CLS_NAME_FAR + props.seleccionado.descripcion : 'fa fa-sync fa-spin')}/>
        {
          props.seleccionado && props.seleccionado.descripcionCorta
        }
        <span className='caret'/>
      </button>
      <ul className='dropdown-menu'
          aria-labelledby='dropdownMenu1'>
        {
          props.elementos.map((elemento, indice) => opcionesFormato(elemento, indice, props))
        }
      </ul>
    </span>
  );
}
