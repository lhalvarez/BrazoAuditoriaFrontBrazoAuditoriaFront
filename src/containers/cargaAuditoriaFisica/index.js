// Dependencies
import React, { Component } from 'react';
import AuditoriasFisicas from '../../components/CargaAuditorias/auditoriasFisicas';



class cargaAuditoriaFisica extends Component {
  render() {
    return (
      <div>
       <AuditoriasFisicas path={this.props.path}/>
      </div>
    );
  }
}

export default cargaAuditoriaFisica;
