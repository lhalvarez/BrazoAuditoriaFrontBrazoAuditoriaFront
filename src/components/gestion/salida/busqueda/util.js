

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


/**
 * Codigo de la tecla enter
 */
const ENTER_KEY_CODE = 13;

const CLASSE_CSS_ERROR = 'has-error';


/**
 * Permite simular 'TAB' al precionar ENTER
 *
 * @param e Evento de teclado 'KeyDown'
 */
export function cambiarFoco(e) {
  // Verifica si es la tecla ENTER
  if (e.keyCode === ENTER_KEY_CODE) {
    const formulario = e.target.form;

    // Verifica si el formulario esta completo
    if (!formularioCompleto(formulario)) {
      // Si el formulario no esta completo, se previene el evento default Submit
      e.preventDefault();

      if (e.target.value) {
        // Si el elemento actual tiene un valor capturado se simula el TAB
        const indice = Array.prototype.indexOf.call(formulario, e.target);
        formulario.elements[indice + 1].focus();
      }
    }
  }
}

/**
 * Crea la cadena CSS a aplicar, dependiendo si se produce error o no
 *
 * @param errorParametros Indica si el error es debido a los valores introducidos por el usuario
 *
 * @returns {string} Cadena de estilo
 */
export function cssErrorGroup(errorParametros) {
  const CSS_ERR = errorParametros ? CLASSE_CSS_ERROR : '';
  return `col-lg-5 form-group ${CSS_ERR}`;
}

/**
 * Agrega o elimina la clase CSS de error
 *
 * @param id Identificador del elemento
 */
export function setCSSErrorGroup(id) {
  document.getElementById(id).classList.add(CLASSE_CSS_ERROR);
}

/**
 * Se encarga de producir el evento para ejecutar la salida logia de una partida
 *
 * @param e Evento del formulario 'Submit'
 * @param props Propiedades con la informacion requerida
 */
export function manejadorClickEjecutarSalida (e, props) {
  e.preventDefault();

  let inputCaja = e.target.elements['inputCaja'];
  let inputFolio = e.target.elements['inputFolio'];

  if (!(validarInputNumber(inputCaja) && validarInputNumber(inputFolio))) {
    return;
  }

  e.target.querySelector('input[type="submit"]').disabled = true;

  const rfid = inputCaja.value;
  const folio = inputFolio.value;

  props.ejecutarSalida(rfid, folio, props.p, props.t);

  e.target.reset();
  e.target.querySelectorAll(`.${CLASSE_CSS_ERROR}`).forEach( el => el.classList.remove(CLASSE_CSS_ERROR));
}

function validarInputNumber(elem) {
  if (isNaN(elem.value)) {
    elem.setCustomValidity('Debes introducir un número.');

    if (elem.reportValidity) {
      elem.reportValidity();
    } else {
      let formulario = elem.form;
      const tmpSubmit = document.createElement('button');
      formulario.appendChild(tmpSubmit);
      tmpSubmit.click();
      formulario.removeChild(tmpSubmit);
    }

    return false;
  }

  return true;
}

/**
 * Permite identificar si el formulario esta completo
 *
 * @param formulario Fomulario a valida
 *
 * @returns {boolean} true si el formulario esta completo,false si no
 */
function formularioCompleto(formulario) {
  const textos = formulario.getElementsByTagName('input');

  for (let i = 0; i < textos.length; i++) {
    if (!textos[i].value) {
      return false;
    }
  }

  return true;
}
