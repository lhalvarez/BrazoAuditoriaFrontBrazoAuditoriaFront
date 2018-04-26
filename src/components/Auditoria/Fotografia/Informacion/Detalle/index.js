import React, { Component , PropTypes} from 'react';


import ContainerTitle from '../../../../Global/ContainerTitle';
import Formulario from './Formulario';
import {TITLES} from '../../../../../constants/index';
import {getPartidaDetail,getCatEstadoAuditoria} from "./actions";
import {connect} from "react-redux";
import {CAMPOS} from '../../../../../data/fakeSelectsParametrizables';

class Detalle extends Component {

  constructor(props) {
    super(props);
  }


  componentWillMount(){
    this.props.getPartidaDetail(this.props.idPartida);
    this.props.getCatEstadoAuditoria();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.detallePartida != nextProps.detallePartida) {
      this.setState({detallePartida: Object.assign({}, nextProps.detallePartida)});
    }
  }


  render() {
      return (
        <div>
          <ContainerTitle title={TITLES.AUDITORIA.FOTOGRAFIA.PARTIDAS_DETALLES
            .replace(":idPartida", this.props.idPartida)} />
          <Formulario campos={CAMPOS} detallePartida={this.props.detallePartida} catEstadoAuditoria={this.props.catEstadoAuditoria}/>
        </div>
      );
  }
}

Detalle.PropTypes = {
  detallePartida: PropTypes.object.isRequired,
  catEstadoAuditoria: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    detallePartida: state.detallePartida.detallePartida,
    catEstadoAuditoria: state.detallePartida.catalogoestadoAuditoria
  }
}
export default connect(mapStateToProps,{getPartidaDetail,getCatEstadoAuditoria})(Detalle);

