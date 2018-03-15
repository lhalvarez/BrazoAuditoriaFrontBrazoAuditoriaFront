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
  			<div className="partida-container">
          <a href="https://cdn0.bodas.com.mx/emp/fotos/8/7/2/2/1948197-10153831586765471-1974888041-n_5_118722.jpg" data-toggle="lightbox">
  				  <div className="hover-curtain"><i className="fa fa-5x fa-search-plus"></i></div>
            <img src={imagenPartida} alt="Imagen de la Partida" />
          </a>
  			</div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(FotoPartida);