import React, { Component } from 'react';

class AuditoriaFormSearch extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.buscarPartida(this.props.buscarPartida);
    };

    resetForm = () => {
        this.formBusquedaPartida.reset();
        this.props.limpiar();
    };

    render = () => {
        return(
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <form ref={(el) => this.formBusquedaPartida = el} onSubmit={this.onFormSubmit}>
                            <div className="panel-heading">
                                <p>Busqueda de partida</p>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Folio:</label>
                                            <div className="col-sm-8">
                                                <input id="inputFolio" className="form-control input-sm" placeholder="Folio de la partida"
                                                       onChange={this.props.handlePartida} type="number" value={this.props.folio} required="required" min="1" max="999999999" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="pull-right">
                                            <input className="btn btn-sm btn-primary" type="submit" value="Buscar Partida"/>
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
    };
}

export default AuditoriaFormSearch;
