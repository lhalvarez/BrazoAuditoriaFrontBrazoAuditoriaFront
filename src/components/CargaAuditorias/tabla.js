import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class SeccionTabla extends Component {

  constructor(props) {
    super(props);
    this.getDoc =this.getDoc.bind(this);
    this.deleteDoc =this.deleteDoc.bind(this);
    this.state = {
    };

  };

  getDoc(nombreArchivo){
    this.props.getDoc(nombreArchivo);
  }
  deleteDoc(nombreArchivo){
    this.props.deleteDoc(nombreArchivo);
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
                        <th>Opciones</th>
                      </tr>
                      </thead>
                      <tbody>

                      {listaDeAuditorias.map((auditoria, index) => {
                        const {id, carga} = auditoria;
                        if(carga.tipoAuditoria.id === 1){
                          return (
                            <tr key={`${index}-${id}`}>
                              <td>{id}</td>
                              <td><Link to="#" onClick={() => {this.getDoc(carga.nombreArchivo)} }>{carga.nombreArchivo}</Link></td>
                              <td>{carga.idSucursal}</td>
                              <td>{carga.solicitante}</td>
                              <td>{carga.noPartidas}</td>
                              <td>Pendiente de autorización</td>
                              <td>
                                <Link to="#" onClick={() => {this.deleteDoc(carga.nombreArchivo)} }>
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
                      <td>{id}</td>
                      <td><Link to="#" onClick={() => {this.getDoc(carga.nombreArchivo)} }>{carga.nombreArchivo}</Link></td>
                      <td>{carga.idSucursal}</td>
                      <td>{carga.solicitante}</td>
                      <td>{carga.noPartidas}</td>
                      <td>Pendiente de autorización</td>
                      <td>{carga.tipoAuditoria.descripcion}</td>
                      <td>
                        <Link to={{ pathname: `/detalle-auditoria-fotografia/${id}`,
                          query: { nombreArchivo: carga.nombreArchivo }}}>
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
    );
  }

}

export default SeccionTabla;
