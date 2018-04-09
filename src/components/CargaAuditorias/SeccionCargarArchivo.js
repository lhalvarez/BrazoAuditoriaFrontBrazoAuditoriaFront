import React, { Component } from 'react';
import { Receiver } from 'react-file-uploader';
import './style.css';
import ContainerTitle from '../Global/ContainerTitle';
import { PropTypes } from 'react';
//import {addNotification} from '../../components/Global/GlobalActions'


class SeccionCargarArchivos extends Component {
  constructor(props) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeTipoAuditoria = this.onChangeTipoAuditoria.bind(this);

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.state = {
      tipoCarga: '',
      file:null,
      nameFile: 'Arrastre y suelte su archivo en esta área',
      fileError: null
    };

  };
  onChangeFile(e,files) {

    files.forEach(file => {
      this.setState({file:file});
      this.setState({nameFile:file.name});
      if (file.size > 2000 * 2000) {
        file.error = 'El archivo debe tener menos de 2MB';
        this.setState({fileError:file.error})
        this.setState({file:null});
        this.setState({nameFile:'Error en el archivo'});
      }
      console.log(file.name.split('.').pop());

        if(file.name.split('.').pop() !== 'csv'){
          file.error = 'El archivo debe de ser en formato .csv';
          this.setState({fileError:file.error});
          this.setState({file:null});
          this.setState({nameFile:'Error en el archivo'});
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
      this.props.sendNotification('Error al enviar documento','Debe cargar un documento válido','error');
      return;
    }
    if(this.props.tipoAuditoria === 2){
      if(this.state.tipoCarga === ''){
        this.props.sendNotification('Error al enviar documento','Debe seleccionar un tipo de auditoría física','error');
        return;
      }
    }

    this.fileUpload(this.state.file);
  }
  resetForm = () => {

    this.setState({fileError:null});
    this.setState({file:null});
    this.setState({nameFile:'Arrastre y suelte su archivo en esta área'});
    $('#documento').val(0);
  };
  fileUpload(file){
    var formData = new FormData();
    formData.append('file',file,'file')

    if(this.props.tipoAuditoria === 1){
      var tipoAudit = 'AIM';
    }else{
      var tipoAudit = this.state.tipoCarga;
    }


    let estadoAuditoría = 'En espera de revisión';
    const auditoria = {
      "estadoAuditoria": estadoAuditoría,
      "estadoCarga": 'Cargando...',
      "idSucursal": this.props.detalleUsuario.sucursal,
      "nombreArchivo": file.name,
      "solicitante": this.props.detalleUsuario.usuario,
      "tipoAuditoria": tipoAudit
    };

    this.props.saveAuditoria(auditoria);
    this.props.saveDoc(formData);
  }


  onDragEnter(e) {
    this.setState({ isReceiverOpen: true });
    console.log('onDragEnter');
  }

  onDragOver(e) {
    // your codes here
    console.log('onDragOver');
  }

  onDragLeave(e) {
    this.setState({ isReceiverOpen: false });
    console.log('onDragLeave');
  }





  render = () => {

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
              <form id="formBusquedaPartida" onSubmit={this.onFormSubmit}>
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
                <form id="formBusquedaPartida" onSubmit={this.onFormSubmit}>
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
