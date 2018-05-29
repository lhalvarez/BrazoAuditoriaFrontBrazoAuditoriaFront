import React, { Component } from 'react';
import { Receiver } from 'react-file-uploader';
import './style.css';
import ContainerTitle from '../Global/ContainerTitle';
import { PropTypes } from 'react';
import { store } from '../../store';


class SeccionCargarArchivos extends Component {
  constructor(props) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.crearAuditoria = this.crearAuditoria.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeTipoAuditoria = this.onChangeTipoAuditoria.bind(this);

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.state = {
      tipoCarga: '',
      file:null,
      nameFile: this.props.api.CARGA.DD_VACIO,
      fileError: null,
      percentage: 0
    };

    this.unsuscribe = store.subscribe(this.handleStoreChange);
  };

  onChangeFile(e,files) {

    files.forEach(file => {
      this.setState({file:file});
      this.setState({nameFile:file.name});
      if (file.size > this.props.api.CARGA.TAMANO_NUMERO * this.props.api.CARGA.TAMANO_NUMERO) {
        file.error = this.props.api.CARGA.TAMANO_ARCHIVO+' '+this.props.api.CARGA.TAMANO_MB;
        this.setState({fileError:file.error})
        this.setState({file:null});
        this.setState({nameFile:this.props.api.CARGA.ERROR_ARCHIVO});
      }
      console.log(file.name.split('.').pop());

      if(file.name.split('.').pop() !== 'csv'){
        file.error = this.props.api.CARGA.FORMATO_ARCHIVO_LEYENDA+' '+this.props.api.CARGA.FORMATO_ARCHIVO;
        this.setState({fileError:file.error});
        this.setState({file:null});
        this.setState({nameFile:this.props.api.CARGA.ERROR_ARCHIVO});
      }else{
        this.setState({fileError:null});
      }



    });

  }

  onChangeTipoAuditoria(e){
    this.setState({tipoCarga:e.target.value});
  }

  onFormSubmit(e,dispatch){
    e.preventDefault();


    if(this.state.file === null){
      this.props.sendNotification(this.props.api.CARGA.ERROR_ENVIAR_DOC,this.props.api.CARGA.ERROR_DOCUMENTO_VALIDO,'error');
      return;
    }
    if(this.props.tipoAuditoria === 2){
      if(this.state.tipoCarga === ''){
        this.props.sendNotification(this.props.api.CARGA.ERROR_ENVIAR_DOC,this.props.api.CARGA.ERROR_SELECT_AUDIT,'error');
        return;
      }
    }

    this.crearAuditoria();
  }

  resetForm = () => {
    let newState = {
      fileError: null,
      file: null,
      nameFile: this.props.api.CARGA.DD_VACIO,
      percentage: 0
    };

    this.setState(newState);
    $('#documento').val(0);
  };

  crearAuditoria(){
    const file = this.state.file;

    if(this.props.tipoAuditoria === 1){
      var tipoAudit = 'AIM';
    }else{
      var tipoAudit = this.state.tipoCarga;
    }

    let estadoAuditoría = this.props.api.CARGA.ESPERA_REVISION;
    const auditoria = {
      "idSucursal": this.props.detalleUsuario.sucursal,
      "nombreArchivo": file.name,
      "solicitante": this.props.detalleUsuario.usuario,
      "tipoAuditoria": tipoAudit
    };
    //console.log(file);
    this.props.saveAuditoria(auditoria);
  }

  onUploadProgress(progressEvent){
    let percentage = Math.round((progressEvent.loaded * 99) / progressEvent.total);
    this.setState({ percentage });
  }

  onDragEnter(e) {
    this.setState({ isReceiverOpen: true });
    console.log('onDragEnter');
  }

  onDragOver(e) {
    console.log('onDragOver');
  }

  onDragLeave(e) {
    this.setState({ isReceiverOpen: false });
    console.log('onDragLeave');
  }

  handleStoreChange(){
    if(store.getState().cargaAuditora.auditoriaCreada){
      var formData = new FormData();
      formData.append('file',this.state.file);

      this.props.saveDoc(formData,this.onUploadProgress);
    }

    if(store.getState().cargaAuditora.archivoCargado){
      this.setState({ percentage: 100 });
      this.props.getDocs(0, 10);
    }
  }

  componentWillUnmount(){
    this.unsuscribe();
  }


  render = () => {

    const {percentage} = this.state;

    if(this.props.tipoAuditoria === 1){
      return(
        <div className="row">

          <ContainerTitle title={'Carga de auditoría por fotografía'}/>
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading" >
                <i className="fa fa-2x fa-upload pull-right"></i>
                <p>Carga nuevo archivo auditoría</p>

              </div>
              <form id="formBusquedaPartida" onSubmit={this.onFormSubmit} encType="multipart/form-data">
                <div className="panel-body" style={{paddingTop: '10px', paddingBottom: '0px'}}>
                  <div className="row">
                    <div className="col-lg-6 col-lg-offset-3">
                      <div className="form-group row">
                        <label htmlFor="documento" className="col-sm-2 control-label"></label>
                        <div className="col-sm-12">

                          <Receiver
                            isOpen={true}
                            onDragEnter={this.onDragEnter}
                            onDragOver={this.onDragOver}
                            onDragLeave={this.onDragLeave}
                            onFileDrop={this.onChangeFile}
                          >
                            <div className="form-control-file text-primary" id="inputDrop" data-title={this.state.nameFile}>
                            </div>

                          </Receiver>
                          <div className="msgError text-danger">{this.state.fileError}</div>

                          {
                            (percentage > 0)
                            &&
                            <div className="progress">
                              <div className={'progress-bar progress-bar-striped active' + ( (percentage == 100) ? ' progress-bar-success' : '' )} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}>
                                {percentage}%
                              </div>
                            </div>
                          }

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="pull-right">
                        <input style={{marginRight: '5px'}} className="btn btn-sm btn-primary" type="submit" value="Cargar Documento"/>

                        <button className="btn btn-sm btn-primary" type="button" onClick={this.resetForm}>Limpiar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>

          <div className="row">
            <ContainerTitle title={'Carga de auditoría física'}/>
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <i className="fa fa-2x fa-upload pull-right"></i>
                  <p>Carga nuevo archivo auditoría física</p>
                </div>
                <form id="formBusquedaPartida" onSubmit={this.onFormSubmit} encType="multipart/form-data">
                  <div className="panel-body" style={{paddingTop: '10px', paddingBottom: '0px'}}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group row">
                          <label htmlFor="documento" className="col-sm-2 control-label">Tipo de auditoría</label>
                          <div className="col-sm-10">
                            <select className="form-control" id="documento" defaultValue={0}
                                    onChange={this.onChangeTipoAuditoria}>
                              <option value="0">Seleccione...</option>
                              <option value="AFCC">Caja Cerrada</option>
                              <option value="AFCA">Caja Abierta</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group row">
                          <div className="col-sm-12">
                            <Receiver
                              isOpen={true}
                              onDragEnter={this.onDragEnter}
                              onDragOver={this.onDragOver}
                              onDragLeave={this.onDragLeave}
                              onFileDrop={this.onChangeFile}
                            >
                              <div className="form-control-file text-primary" id="inputDrop"
                                   data-title={this.state.nameFile}>
                              </div>
                            </Receiver>
                            <div className="msgError text-danger">{this.state.fileError}</div>

                            {
                              (percentage > 0)
                              &&
                              <div className="progress">
                                <div className={'progress-bar progress-bar-striped active' + ( (percentage == 100) ? ' progress-bar-success' : '' )} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}>
                                  {percentage}%
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="pull-right">
                          <input style={{marginRight: '5px'}} className="btn btn-sm btn-primary" type="submit"
                                 value="Cargar Documento"/>
                          <button className="btn btn-sm btn-primary" type="button" onClick={this.resetForm}>Limpiar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
}


export default SeccionCargarArchivos;
