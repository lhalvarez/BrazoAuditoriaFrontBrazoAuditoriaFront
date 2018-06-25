import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Pagination from 'rc-pagination';
import PartidaFormSearch from './PartidaFormSearch';
import PartidaAuditoriaList from './PartidaAuditoriaList';
import { buscarPartida, paginarResultados } from "../../actions";
import ContainerTitle from '../../../../Global/ContainerTitle';
import {TITLES} from '../../../../../constants/index';

class Auditoria extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
        this.buscarPartida = this.buscarPartida.bind(this);
        this.handlePartida = this.handlePartida.bind(this);
        this.limpiar = this.limpiar.bind(this);

        this.state = {
            page: 0,
            pageSize: 10,
            folio: 0,
            busqueda: false
        };
    };

    componentDidMount() {
        this.props.paginarResultados(this.props.idAuditoria, this.state.page, this.state.pageSize);
    }

    buscarPartida = () => {
        console.log('Realizando la busqueda de partida para el folio: ' + this.state.folio);
        this.state.busqueda = true;
        this.props.buscarPartida(this.props.idAuditoria, this.state.folio);
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
        }, this.props.paginarResultados(this.props.idAuditoria, page - 1, this.state.pageSize));
    };

    limpiar = () => {
         if (this.state.busqueda) {
              this.setState({
                  page: 0,
                  pageSize: 10,
                  folio: 0,
                  busqueda: false
              }, this.props.paginarResultados(this.props.idAuditoria, 0, this.state.pageSize));
         }
    };

    render = () => {
        const data = {page: this.state.page, pageSize: this.state.pageSize, total: this.props.total};
        return (
            <div className="auditoriaCont">
                <ContainerTitle title={TITLES.AUDITORIA.FOTOGRAFIA.PARTIDAS_AUDITORIA
                                    .replace(":idAuditoria", this.props.idAuditoria)
                                        .replace(":archivo", this.props.nombreArchivo)} />
                <PartidaFormSearch handlePartida={this.handlePartida} limpiar={this.limpiar}
                                   buscarPartida={this.buscarPartida}  />
                { this.props.partidas.length > 0 && <PartidaAuditoriaList partidas={this.props.partidas} idAuditoria={this.props.idAuditoria}/> }
                <Pagination current={this.state.page + 1}
                            pageSize={data.pageSize}
                            total={data.total}
                            hideOnSinglePage={true}
                            onChange={this.onChange} />
            </div>
        );
    };
}

Auditoria.propTypes = {
    partidas: PropTypes.array.isRequired,
    idAuditoria: PropTypes.string.isRequired,
    nombreArchivo: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        partidas: state.auditoriaFotografia.list,
        total: state.auditoriaFotografia.total
    }
}

export default connect(mapStateToProps, { buscarPartida, paginarResultados } ) (Auditoria);
