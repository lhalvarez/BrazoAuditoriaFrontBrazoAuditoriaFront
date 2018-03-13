// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AuditoriaFisicaCajaAbierta from '../../components/Auditoria/Fisica/CajaAbierta';
import FirmaValuador from '../../components/Auditoria/Fisica/FirmaValuador';

class AuditoriaFisicaAbierta extends Component{
	
	static propTypes = {

  	};

	render(){
		return (
			<div>
				<AuditoriaFisicaCajaAbierta />
				<FirmaValuador />
			</div>
		);
	}
}

export default AuditoriaFisicaAbierta;