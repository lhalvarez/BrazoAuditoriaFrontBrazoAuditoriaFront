import React, { Component } from 'react';
import SeccionCargarArchivos from './SeccionCargarArchivo';
import SeccionTabla from './tabla';
import Pagination from 'rc-pagination';

class CargaFotografia extends Component {

  constructor(props) {

    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      total: 0,
    };
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
          api={this.props.api}/>
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

      <this.ShowTable />
      <Pagination current={this.state.page + 1}
                  pageSize={this.state.pageSize}
                  hideOnSinglePage={true}
                  total={this.props.total}
                  onChange={this.onChangePagination} />


      </div>
    );
  }

}

export default CargaFotografia;
