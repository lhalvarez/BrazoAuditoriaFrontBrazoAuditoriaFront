import React, { Component } from 'react';


import ContainerTitle from '../../../../Global/ContainerTitle';
import Formulario from './Formulario';
import {TITLES} from '../../../../../constants/index';
import {deleteDoc, getDoc, saveAuditoria, saveDoc, sendNotification} from "../../../../CargaAuditorias/actions";
import {connect} from "react-redux";
import {store} from "../../../../../store";
import {CAMPOS} from '../../../../../data/fakeSelectsParametrizables';

class Detalle extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }


  render() {
    return (
      <div>
        <ContainerTitle title={TITLES.AUDITORIA.FOTOGRAFIA.PARTIDAS_DETALLES
          .replace(":idPartida", this.props.idPartida)} />
        <Formulario campos={CAMPOS} />
      </div>
    );
  }
}


function mapStateToProps(state){

  return {

  }

}
export default connect(mapStateToProps,{})(Detalle);
