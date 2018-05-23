import React  from 'react';
import {getDocs,saveDoc,saveAuditoria,getDoc,deleteDoc,sendNotification} from './actions';
import {connect} from 'react-redux';
import { store } from '../../store';
import Pagination from 'rc-pagination';
import {LEYENDAS} from  '../../constants';




import SeccionCargarArchivos from './SeccionCargarArchivo';
import SeccionTabla from './tabla';
import CargaFotografia from './cargaFotografia';

class CargarAuditorias extends React.Component {

  constructor(props) {
    super(props);

    this.switchView = this.switchView.bind(this);
    this.onChangePagination = this.onChangePagination.bind(this);
    this.CargaFoto = this.CargaFoto.bind(this);
    this.CargaFisica = this.CargaFisica.bind(this);

    this.state = {
      detalleUsuario: store.getState().session.detalleUsuario,
      isReceiverOpen: false,
      auditorias: [],
      page: 0,
      pageSize: 10,
      total: 0
    };
    this.tipoAuditoria = 0;
  }
  componentDidMount () {
    this.props.getDocs(this.state.page, this.state.pageSize);

  }

  onChangePagination = (page, pageSize) => {
    this.setState({
      page: page - 1
    }, this.props.getDocs(page - 1, this.state.pageSize));
  };

  switchView(){
    if(this.props.path === '/cargar-partidas-fotografia') this.tipoAuditoria = 1;
    if(this.props.path === '/cargar-partidas-fisica') this.tipoAuditoria = 2;

  }

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

  CargaFisica(){
    let audits = this.props.auditorias;
    let newStateAudits = [];
    audits.forEach(function(element) {
      if(element.carga.tipoAuditoria.id !== 1){
        newStateAudits.push(element);
      }
    });
    if(newStateAudits.length > 0){
      return <SeccionTabla
        auditoriasList={newStateAudits}
        detalleUsuario={this.state.detalleUsuario}
        tipoAuditoria={this.tipoAuditoria}
        getDoc={this.props.getDoc}
        deleteDoc={this.props.deleteDoc}
        api={LEYENDAS}/>
    }else{
      return <div />
    }
  }





  render() {
    this.switchView();
    if (this.tipoAuditoria === 1) {
      return (
        <div>

          <this.CargaFoto />

        </div>
      );
    } else {
      return (
        <div>
          <SeccionCargarArchivos
            path={this.props.path}
            detalleUsuario={this.state.detalleUsuario}
            tipoAuditoria={this.tipoAuditoria}
            saveDoc={this.props.saveDoc}
            saveAuditoria={this.props.saveAuditoria}
            sendNotification={this.props.sendNotification}
            api={LEYENDAS}
            getDocs={this.props.getDocs}

          />
          <this.CargaFisica />
          <Pagination current={this.state.page + 1}
                      pageSize={this.state.pageSize}
                      hideOnSinglePage={true}
                      total={this.state.total}
                      onChange={this.onChangePagination} />

        </div>
      );
    }
  }
}


function mapStateToProps(state) {
  return {
    auditorias: state.cargaAuditora.auditorias,
    total: state.cargaAuditora.totalAuditorias
  }
}
export default connect(mapStateToProps,{saveDoc,saveAuditoria,getDoc,deleteDoc,sendNotification,getDocs})(CargarAuditorias);
