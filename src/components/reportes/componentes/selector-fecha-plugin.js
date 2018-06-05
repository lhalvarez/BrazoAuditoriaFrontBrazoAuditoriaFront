

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


import React, {Component} from 'react';
import '../../../public/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css';


function manejadorCambio(event) {
  if (event.keyCode !== 9) {
    event.preventDefault();
    return false;
  }
}

function cambiarFoco(IN) {
  const FRM = IN.form;
  const IDX = Array.prototype.indexOf.call(FRM, IN);
  IDX >= 0 && FRM.elements[IDX + 1].focus();
}

class SelectorFechaPlugin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const ED = new Date();

    $(`#sandbox-container-${this.props.nombre} input`).datepicker({
      language: 'es',
      endDate: ED,
      autoclose: true,
      todayHighlight: true
    }).on('changeDate', e => {
      if (e.date && e.date.toISOString) {
        this.props.onChange(e.date.toISOString().split('T')[0], this.props.nombre);
        let IN = document.getElementById(this.props.nombre);
        IN.setCustomValidity('');
        cambiarFoco(IN);
      }
    });
  }

  render() {
    const STYLE = this.props.ancho ? {width: this.props.ancho} : {};

    return (
      <div id={`sandbox-container-${this.props.nombre}`}>
        <input id={this.props.nombre}
               name={this.props.nombre}
               type='text'
               className='form-control'
               placeholder='dd/mm/aaaa'
               required={true}
               style={STYLE}
               onPaste={manejadorCambio}
               onKeyDown={manejadorCambio}
        />
      </div>
    );
  }
}


export default SelectorFechaPlugin;
