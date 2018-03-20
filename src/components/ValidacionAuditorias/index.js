import React, { Component } from 'react';
import { AUDITORIAS } from '../../data/fakeAuditorias';
import TablasValidacion from './TablasValidacion';
import { store } from '../../store';


class ValidacionAuditorias extends React.Component {

    constructor(props) {
        super(props);

        this.switchView = this.switchView.bind(this);

        this.state = {
            detalleUsuario: store.getState().session.detalleUsuario,
        };

        this.tipoValidacion = 0;
    }

    switchView() {
        const validacionFotografia = 1;
        const validacionFisica = 2;
        switch (this.props.path) {
            case '/validacion-partidas-fotografia':
                this.tipoValidacion = validacionFotografia
                return;
            case '/validacion-partidas-fisica':
                this.tipoValidacion = validacionFisica
                return;
        }

    }

    render() {
        this.switchView();
        if (this.tipoValidacion === 1) {
            return (
                <div>
                    <TablasValidacion
                        tipoValidacion={this.tipoValidacion}
                        auditorias={AUDITORIAS}
                        detalleUsuario={this.props.detalleUsuario}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <TablasValidacion
                        tipoValidacion={this.tipoValidacion}
                        auditorias={AUDITORIAS}
                        detalleUsuario={this.props.detalleUsuario}
                    />
                </div>
            );
        }
    }


}


export default ValidacionAuditorias;
