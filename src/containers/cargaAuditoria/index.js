// Dependencies
import React, { Component } from 'react';
import CargarAuditorias from '../../components/CargaAuditorias';



class cargaAuditoria extends Component {
  render() {
    return (
      <div>
       <CargarAuditorias path={this.props.path}/>
      </div>
    );
  }
}

export default cargaAuditoria;
