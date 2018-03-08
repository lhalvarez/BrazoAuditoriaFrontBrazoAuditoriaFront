import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import {API} from "../../../../../constants";

class AuditoriaFotografiaFormSearch extends Component {
    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleInputAuditoria = this.handleInputAuditoria.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.getArchivosByNombre = this.getArchivosByNombre.bind(this);
        this.onSelectArchivo = this.onSelectArchivo.bind(this);
        
        this.state = {
            disableInput: false,
            disableAutocomplete: false,
            inputElements: [],
            nombreArchivo: ''
        }
    }
  
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.data.buscarAuditoria();
    };
    
    resetForm = () => {
        this.setState({
            nombreArchivo: '',
            inputElements: [],
            disableInput: false,
            disableAutocomplete: false
        });
        this.formBusquedaAuditoriaFotografia.reset();
        this.props.data.limpiar();
    };
    
    handleInputAuditoria = (e) => {
        this.setState({
            disableAutocomplete: e.target.value !== ''
        });
        this.props.data.handleAuditoria(e);
    };
    
    fetchData = (value) => {
        if (value.length >= 3) {
            console.log("Entrando a fetchData...");
            fetch(`${API.ENDPOINTS.AUDITORIA.FOTOGRAFIA.AUDITORIAS.BUSQUEDA.AUTO_COMPLETE.endpoint}/${value}`)
            .then(data =>
               data.json()
            ).then(dataJson => {
                console.log(dataJson);
                const data = dataJson.object.map(item => (
                    { title: item }
                ));
                this.setState({
                    inputElements: data ? data : []
                })
            });
        }
    };
    
    getArchivosByNombre = (e) => {
        console.log("Entrada: " + e.target.value);
        this.setState({
            disableInput: e.target.value !== '',
            nombreArchivo: e.target.value
        }, this.fetchData(e.target.value));
        this.props.data.handleArchivo(e.target.value);
    };
    
    onSelectArchivo = (val) => {
        this.setState({
            nombreArchivo: val
        });
        this.props.data.handleArchivo(val)
    };
    
    render = () => {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading" style={{paddingBottom: '0px'}}>
                            <p>Búsqueda de Auditoría</p>
                        </div>
                        <form ref={(el) => this.formBusquedaAuditoriaFotografia = el} onSubmit={this.onFormSubmit}>
                            <div className="panel-body" style={{paddingTop: '10px'}}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="col-form-label">Id auditoria:</label>
                                        <input id="inputIdAuditoria"
                                               className="form-control"
                                               placeholder="Id Auditoria"
                                               onChange={this.handleInputAuditoria}
                                               type="number"
                                               value={this.props.data.idAuditoria}
                                               disabled={this.state.disableInput}
                                               required="required" min="1" max="1000000" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="col-form-label">Archivo de carga:</label>
                                        <div className="autoCompleteCont" style={{display: 'block'}}>
                                            <Autocomplete getItemValue={(item) => item.title}
                                                          value={this.state.nombreArchivo}
                                                          items={this.state.inputElements}
                                                          inputProps={
                                                              {
                                                                  placeholder: 'Nombre del archivo...',
                                                                  disabled: this.state.disableAutocomplete,
                                                                  className: 'form-control form-control-sm',
                                                                  style: { width: '100%'}
                                                              }
                                                          }
                                                          renderItem={(item, isHighlighted) =>
                                                              <div style={{
                                                                  background: isHighlighted ? 'lightgray' : 'white',
                                                                  fontSize: '15px',
                                                                  width: '100%',
                                                                  display: 'block',
                                                                  position: 'relative'
                                                              }}>
                                                                  {item.title}
                                                              </div>
                                                          }
                                                          menuStyle={
                                                              {
                                                                  borderRadius: '3px',
                                                                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                                                  background: 'rgba(255, 255, 255, 0.9)',
                                                                  padding: '3px',
                                                                  fontSize: '90%',
                                                                  position: 'fixed',
                                                                  zIndex: '100',
                                                                  overflow: 'auto',
                                                                  maxHeight: '30vh',
                                                              }
                                                          }
                                                          onChange={this.getArchivosByNombre}
                                                          onSelect={this.onSelectArchivo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="pull-right">
                                            <input style={{marginRight: '5px'}} className="btn btn-sm btn-primary" type="submit" value="Buscar Auditoría"/>
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
}

AuditoriaFotografiaFormSearch.propTypes = {
    data: PropTypes.shape({
        archivosAuditoria: PropTypes.array.isRequired,
        handleAuditoria: PropTypes.func.isRequired,
        buscarAuditoria: PropTypes.func.isRequired,
        handleArchivo: PropTypes.func.isRequired,
        limpiar: PropTypes.func.isRequired
    })
};

export default AuditoriaFotografiaFormSearch;
