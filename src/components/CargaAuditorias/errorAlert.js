import React, { Component } from 'react';
import {connect} from "react-redux";

import { LEYENDAS } from '../../constants/index';
import {addNotification} from '../../components/Global/GlobalActions';

class ErrorAlert extends Component{
	// componentDidUpdate(){
	// 	if(this.props.showErrorAlert)
	// 		this.props.addNotification('Atención',LEYENDAS.CARGA.ERROR_CARGA,'warning');
	// }

	render(){

		if(this.props.showErrorAlert)
			return (
				<div className="alert alert-danger" role="alert">
					<p>{LEYENDAS.CARGA.ERROR_CARGA}</p>
				</div>
			);

		return (<div></div>);
	}
}

function mapStateToProps(state) {
  return {
    showErrorAlert: state.cargaAuditora.showErrorAlert
  }
}

export default connect(mapStateToProps,{addNotification})(ErrorAlert);