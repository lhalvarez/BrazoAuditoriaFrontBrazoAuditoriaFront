// Dependencies
import React, { Component } from 'react';
import ValidacionAuditorias from '../../components/ValidacionAuditorias';

class validacionAuditoria extends Component {
    render() {
        return (
            <div>
                <ValidacionAuditorias path={this.props.path} />
            </div>
        );
    }
}

export default validacionAuditoria;
