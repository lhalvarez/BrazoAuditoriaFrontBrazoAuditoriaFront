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

      this.state = {
        crop: {
          x: props.crop.superiorX,
          y: props.crop.superiorY,
          width: (props.crop.inferiorX - props.crop.superiorX),
          height: (props.crop.inferiorY - props.crop.superiorY)
        },
        croppedImg: props.src
      };

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

      let contentTypes = {
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.bmp': 'image/bmp',
        '.gif': 'image/gif'
      };

      let contentType = contentTypes[/^.+(\.jpg|\.png|\.gif|\.bmp)$/.exec(uri)[1]];

      if(contentType){        
        let buffer = await MessageService.fetchBuffer(API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.CARGAR_FOTOGRAFIA.endpoint,{uri});
        let base64Flag = `data:${contentType};base64,`;
        let imageStr = this.arrayBufferToBase64(buffer);

        /* Crear Canvas para la imagen */
        const canvas = document.createElement('canvas');
        canvas.width = this.state.crop.width;
        canvas.height = this.state.crop.height;
        const ctx = canvas.getContext('2d');

        const imgObj = new Image();
        imgObj.crossOrigin = "anonymous";
        imgObj.src = base64Flag + imageStr;

        // As Base64 string
        return new Promise((resolve,reject) => {
          imgObj.onload = () => {
            ctx.drawImage(
              imgObj,
              this.state.crop.x,
              this.state.crop.y,
              this.state.crop.width,
              this.state.crop.height,
              0,
              0,
              this.state.crop.width,
              this.state.crop.height
            );

            resolve(canvas.toDataURL(contentType));
          };
        });
      }
      // As a blob
      // return new Promise((resolve, reject) => {
      //   canvas.toBlob(file => {
      //     file.name = 'cropped-image';
      //     resolve(file);
      //   }, 'image/jpeg');
      // });
    }

    async componentWillMount(){
      let croppedImg = await this.getCroppedImg();
      this.setState({croppedImg});
    }

  	render(){
  		return (
        <div className="row">
    			<div className="partida-container col-sm-8 col-sm-offset-2">
            <a href={this.props.src} data-toggle="lightbox">
    				  <div className="hover-curtain"><i className="fa fa-5x fa-search-plus"></i></div>
              <img src={this.state.croppedImg} alt="Imagen de la partida" />
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