import React  from 'react';
import {getDocs,saveDoc,saveAuditoria,getDoc,deleteDoc,sendNotification} from './actions';
import {connect} from 'react-redux';
import { store } from '../../store';
import Pagination from 'rc-pagination';
import {LEYENDAS} from  '../../constants';
import SeccionCargarArchivos from './SeccionCargarArchivo';
import SeccionTabla from './tabla';
import CargaFotografia from './cargaFotografia';
import { history } from '../../history';

class CargarAuditorias extends React.Component {

  constructor(props) {
    super(props);

    this.onChangePagination = this.onChangePagination.bind(this);
    this.CargaFoto = this.CargaFoto.bind(this);

    this.state = {
      detalleUsuario: store.getState().session.detalleUsuario,
      isReceiverOpen: false,
      auditorias: [],
      page: 0,
      pageSize: 10,
      total: 0,
      tipoAuditoria : 0
    };
    this.tipoAuditoria = 0;
  }
  componentDidMount () {
    if(this.props.path === '/cargar-partidas-fotografia') this.tipoAuditoria = 1;
    if(this.props.path === '/cargar-partidas-fisica') this.tipoAuditoria = 2;
    this.props.getDocs(this.state.page, this.state.pageSize, this.tipoAuditoria);
    this.setState({
      tipoAuditoria: this.tipoAuditoria
    });
  }



  onChangePagination = (page, pageSize) => {
    this.setState({
      page: page - 1
    }, this.props.getDocs(page - 1, this.state.pageSize, this.state.tipoAuditoria));
  };



  CargaFoto(){
    let audits = this.props.auditorias;
    let newStateAudits = [];
    audits.forEach(function(element) {
      if(element.carga.tipoAuditoria.id === 1){
        newStateAudits.push(element);
      }
    });
    return <CargaFotografia
      saveDoc={this.props.saveDoc}
      saveAuditoria={this.props.saveAuditoria}
      auditoriasList={newStateAudits}
      detalleUsuario={this.state.detalleUsuario}
      tipoAuditoria={this.tipoAuditoria}
      getDoc={this.props.getDoc}
      getDocs={this.props.getDocs}
      deleteDoc={this.props.deleteDoc}
      sendNotification={this.props.sendNotification}
      api={LEYENDAS}
      total={this.props.total}
    />

  }


  render() {
    return (
      <div>

        <this.CargaFoto />

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    auditorias: state.cargaAuditora.auditorias,
    total: state.cargaAuditora.totalAuditorias
  }
}
export default connect(mapStateToProps,{saveDoc,saveAuditoria,getDoc,deleteDoc,sendNotification,getDocs})(CargarAuditorias);
