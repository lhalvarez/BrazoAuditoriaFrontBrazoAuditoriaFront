// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    }

    getCroppedImg() {

      const canvas = document.createElement('canvas');
      canvas.width = this.state.crop.width;
      canvas.height = this.state.crop.height;
      const ctx = canvas.getContext('2d');

      const imgObj = new Image();
      imgObj.crossOrigin = "anonymous";
      imgObj.src = this.state.croppedImg;

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

          resolve(canvas.toDataURL('image/jpeg'));
        };
      });

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