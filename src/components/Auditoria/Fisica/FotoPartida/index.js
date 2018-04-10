// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { API } from '../../../../constants';
import MessageService from '../../../../lib/utils/MessageService';

class FotoPartida extends Component{
	 static propTypes = {

  	};

    constructor(props){
      super(props);

      this.state = {croppedImg: ''};

      this.getCroppedImg = this.getCroppedImg.bind(this);
      this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
    }

    arrayBufferToBase64(buffer) {
      let binary = '';
      let bytes = [].slice.call(new Uint8Array(buffer));

      bytes.forEach((b) => binary += String.fromCharCode(b));

      return window.btoa(binary);
    };

    async getCroppedImg() {
      let uri = this.props.src;
      let { superiorX, superiorY, inferiorX, inferiorY } = this.props.crop;

      let contentTypes = {
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.bmp': 'image/bmp',
        '.gif': 'image/gif'
      };

      let contentType = contentTypes[/^.+(\.jpg|\.png|\.gif|\.bmp)$/.exec(uri)[1]];

      if(contentType){
        let buffer = await MessageService.fetchBuffer(API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.CARGAR_FOTOGRAFIA.endpoint,{
          uri,superiorX, superiorY, inferiorX, inferiorY
        });
        let base64Flag = `data:${contentType};base64,`;
        let imageStr = this.arrayBufferToBase64(buffer);

        return (base64Flag + imageStr);
      }
    }

    async componentWillMount(){
      let croppedImg = await this.getCroppedImg();
      this.setState({croppedImg});
    }

  	render(){
      const { croppedImg } = this.state;

      if(!croppedImg){
        return (
          <div className="row">
            <div className="partida-container col-sm-8 col-sm-offset-2" style={{height:'200px'}}>
              <div className="hover-curtain" style={{opacity:1}}><i className="fa fa-5x fa-spinner fa-spin"></i></div>
            </div>
          </div>
        );
      }

  		return (
        <div className="row">
    			<div className="partida-container col-sm-8 col-sm-offset-2">
            <a href={croppedImg} data-toggle="lightbox">
    				  <div className="hover-curtain"><i className="fa fa-5x fa-search-plus"></i></div>
              <img src={croppedImg} alt="Imagen de la partida" />
            </a>
    			</div>
        </div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(FotoPartida);