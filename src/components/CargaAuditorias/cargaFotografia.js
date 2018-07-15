import React, { Component } from 'react';
import SeccionCargarArchivos from './SeccionCargarArchivo';
import SeccionTabla from './tabla';
import Pagination from 'rc-pagination';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ErrorAlert from './errorAlert';

class CargaFotografia extends Component {

  constructor(props) {

    super(props);

    this.onChangePagination = this.onChangePagination.bind(this);
    this.ShowTable = this.ShowTable.bind(this);

  };
  onChangePagination = (page, pageSize) => {
    this.setState({
      page: page - 1
    }, this.props.getDocs(page - 1, this.state.pageSize,this.props.tipoAuditoria));
  };


   ShowTable() {
      if(this.props.auditoriasList.length > 0){
        return <SeccionTabla
          auditoriasList={this.props.auditoriasList}
          detalleUsuario={this.props.detalleUsuario}
          tipoAuditoria={this.props.tipoAuditoria}
          getDoc={this.props.getDoc}
          deleteDoc={this.props.deleteDoc}
          getDocs={this.props.getDocs}
          api={this.props.api}
          total = {this.props.total}
          resetTable={this.props.resetTable}/>
      }else{
        return <div />;
      }
  };

  render  () {
    return(
      <div>
      <SeccionCargarArchivos
        path={this.props.path}
        detalleUsuario={this.props.detalleUsuario}
        tipoAuditoria={this.props.tipoAuditoria}
        saveDoc={this.props.saveDoc}
        saveAuditoria={this.props.saveAuditoria}
        sendNotification={this.props.sendNotification}
        api={this.props.api}
        getDocs={this.props.getDocs}
      />

      <ErrorAlert />

        <this.ShowTable />



      </div>
    );
  }

}

export default DragDropContext(HTML5Backend)(CargaFotografia);
