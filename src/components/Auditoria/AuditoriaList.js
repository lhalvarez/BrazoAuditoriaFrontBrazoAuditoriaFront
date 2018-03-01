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
                        {partidas.map(partida => {
                            const {folio, sucursal} = partida;
                            return (
                                <tr key={folio}>
                                    <td><Link to={`/auditoria-salida-prendas/${folio}`}>{folio}</Link></td>
                                    <td>Sucursal {sucursal}</td>
                                </tr>
                            );
                        })}
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
