import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AuditoriaFotografiaFormSearch extends Component {
    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleDatosForm = this.handleDatosForm.bind(this);
        
        this.state = {
            disableInput: false,
            disableSelect: false
        }
    }
  
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.data.buscarAuditoria();
    };
    
    resetForm = () => {
        this.setState({
            disableInput: false,
            disableSelect: false
        });
        this.formBusquedaAuditoriaFotografia.reset();
        this.props.data.limpiar();
    };
    
    handleDatosForm = (e) => {
        this.setState({
            disableInput: true
        });
        this.props.data.onChangeArchivo(e);
    };
    
    handleInputAuditoria = (e) => {
        this.setState({
            disableSelect: true
        });
        this.props.data.handleAuditoria(e);
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
                                        <select className="form-control form-control-sm"
                                                value={this.props.data.nombreArchivo}
                                                onChange={this.handleDatosForm}
                                                disabled={this.state.disableSelect}>
                                            <option value={''}>Selecciona un archivo</option>
                                            {this.props.data.archivosAuditoria.map(archivo => (
                                                <option key={archivo} value={archivo}>{archivo}</option>
                                            ))}
                                        </select>
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
        onChangeArchivo: PropTypes.func.isRequired,
        limpiar: PropTypes.func.isRequired
    })
};

export default AuditoriaFotografiaFormSearch;
