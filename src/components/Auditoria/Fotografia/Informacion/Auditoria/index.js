import React, {Component} from 'react';
import {TITLES} from '../../../../../constants/index';
import ContainerTitle from '../../../../Global/ContainerTitle';
import AuditoriaFotografiaList from './AuditoriaFotografiaList';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/es_ES';
import AuditoriaFotografiaFormSearch from './AuditoriaFotografiaFormSearch';
import {buscarAuditoria, paginarAuditorias} from "../../actions";
import {connect} from "react-redux";
import {AUDITORIAS} from './../../../../../data/fakeAuditorias';
import PropTypes from 'prop-types';

class InformacionAuditoriaFotografia extends Component {
    constructor() {
        super();
        
        this.onChangePagination = this.onChangePagination.bind(this);
        this.handleArchivo = this.handleArchivo.bind(this);
        this.buscarAuditoria = this.buscarAuditoria.bind(this);
        this.handleAuditoria = this.handleAuditoria.bind(this);
        this.limpiar = this.limpiar.bind(this);
        
        this.state = {
            page: 0,
            pageSize: 10,
            total: 0,
            idAuditoria: null,
            nombreArchivo: null,
            busqueda: false
        }
    }
    
    componentDidMount () {
        this.props.paginarAuditorias(this.state.page, this.state.pageSize);
    }
    
    onChangePagination = (page, pageSize) => {
        console.log('onChangePagination:current=', page);
        console.log('onChangePagination:pageSize=', pageSize);
        this.setState({
            page: page - 1
        }, this.props.paginarAuditorias(page - 1, this.state.pageSize));
    };
    
    handleArchivo = (archivo) => {
      console.log("Archivo: " + archivo);
        this.setState({
            nombreArchivo: archivo,
            idAuditoria: null
        });
    };
    
    handleAuditoria = (event) => {
        console.log('Entrando a la funcion handleAuditoria...');
        this.setState({
            idAuditoria: event.target.value,
            nombreArchivo: null
        });
        console.log("Nuevo valor de idAuditoria: " + this.state.idAuditoria);
    };
    
    buscarAuditoria = () => {
        console.log("En funcion buscarAuditoria...");
        console.log("Archivo seleccionado: " + this.state.nombreArchivo);
        console.log("Id auditoria: " + this.state.idAuditoria);
        this.state.busqueda = true;
        this.props.buscarAuditoria(this.state.idAuditoria, window.btoa(this.state.nombreArchivo));
    };
    
    limpiar = () => {
        console.log("En funcion limpiar...");
        if (this.state.busqueda) {
            this.setState({
                page: 0,
                pageSize: 10,
                idAuditoria: null,
                nombreArchivo: null,
                busqueda: false
            }, this.props.paginarAuditorias(0, this.state.pageSize));
        }
    };
    
    render = () => {
        // todo: verificar de donde se obtendran los archivos para llenar el select
        const archivos = AUDITORIAS.map(auditoria => auditoria.nombreArchivo);
        const data = {
            archivosAuditoria: archivos,
            buscarAuditoria: this.buscarAuditoria,
            handleAuditoria: this.handleAuditoria,
            handleArchivo: this.handleArchivo,
            limpiar: this.limpiar
        };
        
        return (
            <div className="auditoriaFotografiaCont">
                <ContainerTitle title={TITLES.AUDITORIA.FOTOGRAFIA.INFO_AUDITORIA} />
                <AuditoriaFotografiaFormSearch data={data} />
                { this.props.auditorias.length > 0 && <AuditoriaFotografiaList auditorias={this.props.auditorias} /> }
                <Pagination current={this.state.page + 1}
                            pageSize={this.state.pageSize}
                            hideOnSinglePage={true}
                            total={this.state.total}
                            locale={localeInfo}
                            onChange={this.onChangePagination} />
            </div>
        );
    }
}

InformacionAuditoriaFotografia.propTypes = {
    auditorias: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        auditorias: state.auditoriaFotografia.list,
        total: state.auditoriaFotografia.total
    }
}

export default connect(mapStateToProps, { buscarAuditoria, paginarAuditorias }) (InformacionAuditoriaFotografia);
