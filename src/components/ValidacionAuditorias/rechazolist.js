// Dependencies
import React, { Component } from 'react';

class RechazoList extends Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.state = {

        };
    }

    onBlur(carga, e) {
        let rejectObj;
        if (!e.target.value.trim().length) {
            //Valida que tenga por lo menos un caracter el rechazo
            return;
        }

        let objRechazo = {

            "autorizada": false,
            "autorizador": this.props.usuario,
            "idAuditoria": carga.id,
            "observaciones": e.target.value

        }

        this.props.selectedReject.push(objRechazo)
        // console.log(objRechazo);
    }

    clearContent(e) {
        e.target.value = '';
    }



    render() {
        return (
            <div key={this.state.timestamp}>
                {this.props.checked.map((carga, index) => (
                    <div className="form-group" key={index} >
                        <label >El motivo del rechazo del archivo: {carga.nombreArchivo} </label>
                        <textarea className="form-control" rows="5" onBlur={this.onBlur.bind(this, carga)} placeholder="El motivo del rechazo es..."
                            onFocus={this.clearContent.bind(this)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default RechazoList;