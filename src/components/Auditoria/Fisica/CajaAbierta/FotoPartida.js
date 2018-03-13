// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import imagenPartida from '../../../../public/images/prenda.jpg';

class FotoPartida extends Component{
	static propTypes = {

  	};

  	render(){
  		return (
  			<div>
  				<img src={imagenPartida} alt="Imagen de la Partida" />
  			</div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(FotoPartida);