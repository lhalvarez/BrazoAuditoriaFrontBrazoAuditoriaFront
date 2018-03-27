// Dependencies
import React, { Component } from 'react';

import AuditoriaFisicaCajaCerrada from '../../components/Auditoria/Fisica/CajaCerrada';
import FirmaValuador from '../../components/Auditoria/Fisica/FirmaValuador';

class AuditoriaFisicaCerrada extends Component{


	render(){
		return (
      <div>
        <AuditoriaFisicaCajaCerrada />
        <FirmaValuador />
      </div>
		);
	}
}

export default AuditoriaFisicaCerrada;
