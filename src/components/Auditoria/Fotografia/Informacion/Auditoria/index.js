import React, {Component} from 'react';
import {TITLES} from '../../../../../constants/index';
import ContainerTitle from '../../../../Global/ContainerTitle';
import AuditoriaFotografiaList from './AuditoriaFotografiaList';
import Pagination from 'rc-pagination';
import AuditoriaFotografiaFormSearch from './AuditoriaFotografiaFormSearch';
import {buscarAuditoria, paginarAuditorias} from "../../actions";
import {connect} from "react-redux";
import {AUDITORIAS} from './../../../../../data/fakeAuditorias';

class InformacionAuditoriaFotografia extends Component {
    constructor() {
        super();
        
        this.onChangePagination = this.onChangePagination.bind(this);
        this.onChangeArchivo = this.onChangeArchivo.bind(this);
        this.buscarAuditoria = this.buscarAuditoria.bind(this);
        this.handleAuditoria = this.handleAuditoria.bind(this);
        this.limpiar = this.limpiar.bind(this);
        
        this.state = {
            page: 0,
            pageSize: 10,
            total: 0,
            idAuditoria: null,
            nombreArchivo: null
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
    
    onChangeArchivo = (event) => {
      console.log("Archivo: " + event.target.value);
        this.setState({
            nombreArchivo: event.target.value,
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
        this.props.buscarAuditoria(this.state.idAuditoria, this.state.nombreArchivo);
    };
    
    limpiar = () => {
        console.log("En funcion limpiar...");
        if ((this.state.idAuditoria || this.state.nombreArchivo)
                && this.props.total < this.state.pageSize) {
            this.setState({
                page: 0,
                pageSize: 10,
                idAuditoria: null,
                nombreArchivo: null
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
            onChangeArchivo: this.onChangeArchivo,
            limpiar: this.limpiar
        };
        
        return (
            <div className="auditoriaFotografiaCont">
                <ContainerTitle title={TITLES.AUDITORIA.FOTOGRAFIA.INFO_AUDITORIA} />
                <AuditoriaFotografiaFormSearch data={data} />
                <AuditoriaFotografiaList auditorias={this.props.auditorias} />
                <Pagination current={this.state.page + 1}
                            pageSize={this.state.pageSize}
                            hideOnSinglePage={true}
                            total={this.state.total}
                            onChange={this.onChangePagination} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auditorias: state.auditoriaFotografia.list,
        total: state.auditoriaFotografia.total
    }
}

export default connect(mapStateToProps, { buscarAuditoria, paginarAuditorias }) (InformacionAuditoriaFotografia);
