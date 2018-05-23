import React, { Component , PropTypes} from 'react';


import ContainerTitle from '../../../../Global/ContainerTitle';
import Formulario from './Formulario';
import {TITLES} from '../../../../../constants/index';
import {getPartidaDetail,getCatEstadoAuditoria,enviarDetallePartida,flushdetallePartida} from "./actions";
import {connect} from "react-redux";
import {CAMPOS} from '../../../../../data/fakeSelectsParametrizables';

class Detalle extends Component {

  constructor(props) {
    super(props);
  }


  componentWillMount(){
    this.props.getPartidaDetail(this.props.idPartida,this.props.idAuditoria);
    this.props.getCatEstadoAuditoria();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.detallePartida != nextProps.detallePartida) {
      this.setState({detallePartida: Object.assign({}, nextProps.detallePartida)});
    }
  }

  componentWillUnmount(){
    this.props.flushdetallePartida();
  }


  render() {
      return (
        <div>
          <ContainerTitle title={TITLES.AUDITORIA.FOTOGRAFIA.PARTIDAS_DETALLES
            .replace(":idPartida", this.props.idPartida)} />
          <Formulario campos={CAMPOS} detallePartida={this.props.detallePartida}
                      catEstadoAuditoria={this.props.catEstadoAuditoria}
                      enviarDetallePartida={this.props.enviarDetallePartida}/>
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
export default connect(mapStateToProps,{getPartidaDetail,getCatEstadoAuditoria,enviarDetallePartida,flushdetallePartida})(Detalle);
