import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class SeccionTabla extends Component {

constructor(props) {
    super(props);
    this.state = {
    };
  };

  render = () => {

  const auditorias = this.props.auditorias;
  if(this.props.tipoAuditoria === 1){
    return(
      <div className="row">
                  <div className="col-lg-12">
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
                                  {auditorias.map((auditoria, index) => {
                                      const {id, nombreArchivo, totalPartidas} = auditoria;
                                      return (
                                          <tr key={`${index}-${id}`}>
                                              <td>{id}</td>
                                              <td>{nombreArchivo}</td>
                                              <td>{this.props.detalleUsuario.sucursal}</td>
                                              <td>{this.props.detalleUsuario.usuario}</td>
                                              <td>{totalPartidas}</td>
                                              <td>Pendiente de autorización</td>
                                              <td>
                                                  <Link to={{ pathname: `/detalle-auditoria-fotografia/${id}`,
                                                              query: { nombreArchivo: nombreArchivo }}}>
                                                      Eliminar
                                                  </Link>
                                              </td>
                                          </tr>
                                      );
                                  })}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
    );
    }
    return(
          <div className="row">
                      <div className="col-lg-12">
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
                                      {auditorias.map((auditoria, index) => {
                                          const {id, nombreArchivo, totalPartidas} = auditoria;
                                          return (
                                              <tr key={`${index}-${id}`}>
                                                  <td>{id}</td>
                                                  <td>{nombreArchivo}</td>
                                                  <td>{this.props.detalleUsuario.sucursal}</td>
                                                  <td>{this.props.detalleUsuario.usuario}</td>
                                                  <td>{totalPartidas}</td>
                                                  <td>Pendiente de autorización</td>
                                                  <td>caja Cerrada</td>
                                                  <td>
                                                      <Link to={{ pathname: `/detalle-auditoria-fotografia/${id}`,
                                                                  query: { nombreArchivo: nombreArchivo }}}>
                                                          Eliminar
                                                      </Link>
                                                  </td>
                                              </tr>
                                          );
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
