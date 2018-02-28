import React from 'react';
import PropTypes from 'prop-types';
import 'rc-pagination/assets/index.css';
import { Link } from 'react-router-dom';

const AuditoriaList = ({partidas}) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>Folio</th>
                                <th>Sucursal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {partidas.map(partida =>
                            <tr key={partida.id}>
                                <td><Link to={`/auditoria-salida-prendas/${partida.id}`}>{partida.id}</Link></td>
                                <td>{partida.name}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

AuditoriaList.propTypes = {
    partidas: PropTypes.array.isRequired
};

export default AuditoriaList;
