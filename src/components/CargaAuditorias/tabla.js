import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ModalConfirmacion from './modalConfirmacion';
import Pagination from 'rc-pagination';
import { store } from '../../store';
import {updatePage} from './actions';
import {connect} from "react-redux";

class SeccionTabla extends Component {

  constructor(props) {
    super(props);
    this.getDoc =this.getDoc.bind(this);
    this.deleteDoc =this.deleteDoc.bind(this);
    this.state = {
      idAuditoria: 0,
      showConfirm:false,
      page: 0,
      pageSize: 10,
      total: 0,
    };

    this.onChangePagination = this.onChangePagination.bind(this);
    this.onDeleteElement = this.onDeleteElement.bind(this);
  };

  getDoc(nombreArchivo){
    this.props.getDoc(nombreArchivo);
  }
  deleteDoc(carga,id){
    // variables que se deben de mandar para eliminar la carga de la auditoria
    this.setState({ idAuditoria: carga.id, showConfirm: true });

  }
  onChangePagination = (page, pageSize) => {
    this.setState({
      page: page - 1
    }, this.props.getDocs(page - 1, this.state.pageSize, this.props.tipoAuditoria));
  };

  componentDidUpdate(){
    const { showConfirm } = this.state;

    if(showConfirm){
      $('#modalConfirmacion').modal('show');
      this.setState({ showConfirm: false });
    }
    if(this.props.resetTable === true){
      console.log(this.props.resetTable);
      this.setState({page: 0});
      this.props.updatePage();
    }


  }

  onDeleteElement(){


  }
  render = () => {

    const listaDeAuditorias = this.props.auditoriasList;
    if(this.props.tipoAuditoria === 1){
      return(
        <div className="row">

          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading" >
                <i className="fa fa-2x fa-table pull-right"></i>
                <p>Tabla de auditorías pendientes de autorización</p>

              </div>

                  <div className="table-responsive datagrid">
                    <table className="table table-striped table-bordered table-hover table-condensed">
                      <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre Archivo</th>
                        <th>Sucursal</th>
                        <th>Creador</th>
                        <th>Total Partidas</th>
                        <th>Estatus</th>
                        <th>Opciones</th>
                      </tr>
                      </thead>
                      <tbody>

                      {listaDeAuditorias.map((auditoria, index) => {
                        const {id, carga} = auditoria;
                        if(carga.tipoAuditoria.id === 1){
                          return (
                            <tr key={`${index}-${id}`}>
                              <td>{carga.id}</td>
                              <td>{carga.nombreArchivo}</td>
                              <td>{carga.idSucursal}</td>
                              <td>{carga.solicitante}</td>
                              <td>{carga.noPartidas}</td>
                              <td>Pendiente de autorización</td>
                              <td>
                                <Link to="#" onClick={() => {this.deleteDoc(carga,id)} }>
                                  Eliminar
                                </Link>
                              </td>
                            </tr>
                          );
                        }
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          <Pagination current={this.state.page + 1}
                      pageSize={this.state.pageSize}
                      hideOnSinglePage={true}
                      total={this.props.total}
                      onChange={this.onChangePagination} />
            <ModalConfirmacion idAuditoria={this.state.idAuditoria} tipoAuditoria={this.props.tipoAuditoria} onDeleteElement={this.onDeleteElement}/>
          </div>
      );
    }
    return(
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading" >
            <i className="fa fa-2x fa-table pull-right"></i>
            <p>Tabla de auditorías pendientes de autorización</p>

          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-condensed">
              <thead>
              <tr>
                <th>Id</th>
                <th>Nombre Archivo</th>
                <th>Sucursal</th>
                <th>Creador</th>
                <th>Total Partidas</th>
                <th>Estatus</th>
                <th>Tipo auditoria</th>
                <th>Opciones</th>
              </tr>
              </thead>
              <tbody>

              {listaDeAuditorias.map((auditoria, index) => {
                const {id, carga} = auditoria;

                if(carga.tipoAuditoria.id === 2 || carga.tipoAuditoria.id === 3){
                  return (
                    <tr key={`${index}-${id}`}>
                      <td>{carga.id}</td>
                      <td>{carga.nombreArchivo}</td>
                      <td>{carga.idSucursal}</td>
                      <td>{carga.solicitante}</td>
                      <td>{carga.noPartidas}</td>
                      <td>Pendiente de autorización</td>
                      <td>{carga.tipoAuditoria.descripcion}</td>
                      <td>
                        <Link to="#" onClick={() => {this.deleteDoc(carga,id)} }>
                          Eliminar
                        </Link>
                      </td>
                    </tr>
                  );
                }

              })}
              </tbody>
            </table>
          </div>
        </div>
        {this.props.total > 0 &&  <Pagination current={this.state.page + 1}
                                              pageSize={this.state.pageSize}
                                              hideOnSinglePage={true}
                                              total={this.props.total}
                                              onChange={this.onChangePagination} /> }
        <ModalConfirmacion idAuditoria={this.state.idAuditoria} tipoAuditoria={this.props.tipoAuditoria}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    resetTable: state.cargaAuditora.resetTable
  }
}
export default connect(mapStateToProps,{updatePage})(SeccionTabla);

