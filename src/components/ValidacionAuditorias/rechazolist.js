// Dependencies
import React, { Component } from 'react';

class RechazoList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                {this.props.checked.map((auditoria, index) => (
                    <div className="form-group" key={index} >
                        <label >El motivo del rechazo del archivo: {auditoria.nombreArchivo} </label>
                        <textarea className="form-control" rows="5" onChange={this.onChange} placeholder="El motivo del rechazo es..." />
                    </div>
                ))}
            </div>
        );
    }
}

export default RechazoList;