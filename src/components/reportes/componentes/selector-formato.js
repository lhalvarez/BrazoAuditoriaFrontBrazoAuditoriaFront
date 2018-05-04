

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


const CLS_NAME = 'icono-formato-reporte fa fa-fw ';


/**
 * Se encarga de generar las opciones de acuerdo al numero de formatos en el catálogo
 *
 * @param elemento Elemento
 * @param indice Indice del elemento
 * @param onChange Metodo que manejara los eventos de cambio de seleccion
 *
 * @returns {*}
 */
function opcionesFormato(elemento, indice, onChange) {
  return (
    <li key={indice}>
      <a style={{cursor: 'pointer'}} onClick={() => onChange(indice)}>
        <span className={CLS_NAME + elemento.descripcion}/> {elemento.descripcionCorta}
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
              name='formato'
              type='button'
              data-toggle='dropdown'
              disabled={!props.elementos.length}
              aria-haspopup='true'
              aria-expanded='false'
              className='btn btn-default dropdown-toggle'>
        <span className={CLS_NAME + (props.seleccionado ? props.seleccionado.descripcion : 'fa-refresh fa-spin')}/>
        {
          props.seleccionado && props.seleccionado.descripcionCorta
        }
        <span className='caret'/>
      </button>
      <ul className='dropdown-menu'
          aria-labelledby='dropdownMenu1'>
        {
          props.elementos.map((elemento, indice) => opcionesFormato(elemento, indice, props.onChange))
        }
      </ul>
    </span>
  );
}
