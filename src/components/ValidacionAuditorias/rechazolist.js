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

        let objRechazo = {

            "autorizada": false,
            "autorizador": this.props.usuario,
            "idAuditoria": carga.id,
            "observaciones": e.target.value

        }

        this.props.selectedReject.push(objRechazo)
        // console.log(objRechazo);
    }



    render() {
        return (
            <div>
                {this.props.checked.map((carga, index) => (
                    <div className="form-group" key={index} >
                        <label >El motivo del rechazo del archivo: {carga.nombreArchivo} </label>
                        <textarea className="form-control" rows="5" onBlur={this.onBlur.bind(this, carga)} placeholder="El motivo del rechazo es..." />
                    </div>
                ))}
            </div>
        );
    }
}

export default RechazoList;