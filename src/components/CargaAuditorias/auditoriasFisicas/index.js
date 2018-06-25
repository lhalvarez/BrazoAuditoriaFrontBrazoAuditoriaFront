import React  from 'react';
import {getDocs,saveDoc,saveAuditoria,getDoc,deleteDoc,sendNotification} from '../actions';
import {connect} from 'react-redux';
import { store } from '../../../store';
import Pagination from 'rc-pagination';
import {LEYENDAS} from  '../../../constants';
import SeccionCargarArchivos from '../SeccionCargarArchivo';
import SeccionTabla from '../tabla';
import CargaFotografia from '../cargaFotografia';
import { history } from '../../../history';

class AuditoriasFisicas extends React.Component {

  constructor(props) {
    super(props);

    this.onChangePagination = this.onChangePagination.bind(this);
    this.CargaFisica = this.CargaFisica.bind(this);

    this.state = {
      detalleUsuario: store.getState().session.detalleUsuario,
      isReceiverOpen: false,
      auditorias: [],
      page: 0,
      pageSize: 10,
      total: 0
    };
    this.tipoAuditoria = 2;
  }

  componentDidMount () {
    this.props.getDocs(this.state.page, this.state.pageSize, this.tipoAuditoria);
    this.setState({total:this.props.total});
  }



  onChangePagination = (page, pageSize) => {
    this.setState({
      page: page - 1
    }, this.props.getDocs(page - 1, this.state.pageSize, this.tipoAuditoria));
  };






  CargaFisica(){
    let audits = this.props.auditorias;
    let auditsCajaAbierta = this.props.auditoriasfisicas;
    let newStateAudits = [];
    audits.forEach(function(element) {
      if(element.carga.tipoAuditoria.id !== 1){
        newStateAudits.push(element);
      }
    });
    if(auditsCajaAbierta){
      auditsCajaAbierta.forEach(function(element) {
        if(element.carga.tipoAuditoria.id !== 1){
          newStateAudits.push(element);
        }
      });
    }

    if(newStateAudits.length > 0){
      newStateAudits.sort(function (a, b){
          return (b.id - a.id)
      })
      return <SeccionTabla
        auditoriasList={newStateAudits}
        detalleUsuario={this.state.detalleUsuario}
        tipoAuditoria={this.tipoAuditoria}
        getDoc={this.props.getDoc}
        deleteDoc={this.props.deleteDoc}
        api={LEYENDAS}
        total = {this.props.total}
        resetTable={this.props.resetTable}
        getDocs={this.props.getDocs}/>
    }else{
      return <div />
    }
  }





  render() {

      return (
        <div>
          <SeccionCargarArchivos
            path={this.props.path}
            detalleUsuario={this.state.detalleUsuario}
            tipoAuditoria={this.tipoAuditoria}
            saveDoc={this.props.saveDoc}
            getDocs={this.props.getDocs}
            saveAuditoria={this.props.saveAuditoria}
            sendNotification={this.props.sendNotification}
            api={LEYENDAS}
            resetTable={this.props.resetTable}

          />
          <this.CargaFisica />


        </div>
      );
  }
}


function mapStateToProps(state) {
  return {
    auditorias: state.cargaAuditora.auditorias,
    total: state.cargaAuditora.totalAuditorias,
    auditoriasfisicas:state.cargaAuditora.auditoriasfisicas,
    resetTable: state.cargaAuditora.resetTable
  }
}
export default connect(mapStateToProps,{saveDoc,saveAuditoria,getDoc,deleteDoc,sendNotification,getDocs})(AuditoriasFisicas);
