import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Pagination from 'rc-pagination';
import AuditoriaFormSearch from './AuditoriaFormSearch';
import AuditoriaList from './AuditoriaList';
import { buscarPartida, paginarResultados } from "./actions";

class Auditoria extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.buscarPartida = this.buscarPartida.bind(this);
        this.handlePartida = this.handlePartida.bind(this);
        this.limpiar = this.limpiar.bind(this);

        this.state = {
            page: 0,
            pageSize: 10,
            folio: 0,
            idAuditoria: 1
        };
    };

    componentDidMount() {
        this.props.paginarResultados(this.state.idAuditoria, this.state.page, this.state.pageSize);
        console.log('Estoy apunto de montar el componente');
    }

    buscarPartida = () => {
        console.log('Realizando la busqueda de partida para el folio: ' + this.state.folio);
        this.setState({
            page: 0,
            pageSize: 10
        });
        this.props.buscarPartida(this.state.idAuditoria, this.state.folio);
    };

    handlePartida = (event) => {
        console.log('Entrando a la funcion handlePartida...');
        this.setState({
            folio: event.target.value
        });
        console.log("Nuevo valor del folio: " + this.state.folio);
    };

    onChange = (page, pageSize) => {
        console.log('onChange:current=', page);
        console.log('onChange:pageSize=', pageSize);
        this.setState({
            page: page - 1
        }, this.props.paginarResultados(this.state.idAuditoria, page - 1, this.state.pageSize));
    };

    limpiar = () => {
         if (this.state.folio !== 0 && this.props.total === 0) {
            this.setState({
              page: 0,
              pageSize: 10,
              folio: 0
            }, this.props.paginarResultados(this.state.idAuditoria, 0, this.state.pageSize));
         }
    };

    render = () => {
        const data = {page: this.state.page, pageSize: this.state.pageSize, total: this.props.total};
        return (
            <div className="auditoriaCont">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Auditoría por Fotografía</h1>
                    </div>
                </div>
                <AuditoriaFormSearch handlePartida={this.handlePartida} limpiar={this.limpiar} buscarPartida={this.buscarPartida}  />
                <AuditoriaList partidas={this.props.partidas} />
                <Pagination current={this.state.page + 1} pageSize={data.pageSize} total={data.total} onChange={this.onChange} />
            </div>
        );
    };
}

Auditoria.propTypes = {
    partidas: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        partidas: state.partidas.list,
        total: state.partidas.total,
        folio: state.partidas.folio
    }
}

export default connect(mapStateToProps, { buscarPartida, paginarResultados } ) (Auditoria);
