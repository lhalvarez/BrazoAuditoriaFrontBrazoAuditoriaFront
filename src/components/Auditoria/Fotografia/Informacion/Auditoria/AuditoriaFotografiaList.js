import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const AuditoriaFotografiaList = ({auditorias}) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre archivo</th>
                                <th>Total Partidas</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditorias.map((auditoria, index) => {
                                const {id, nombreArchivo, totalPartidas} = auditoria;
                                return (
                                    <tr key={`${index}-${id}`}>
                                        <td>{id}</td>
                                        <td>{nombreArchivo}</td>
                                        <td>{totalPartidas}</td>
                                        <td>
                                            <Link to={{ pathname: `/detalle-auditoria-fotografia/${id}`,
                                                        query: { nombreArchivo: nombreArchivo }}}>
                                                Ver detalles
                                            </Link>
                                        </td>
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

AuditoriaFotografiaList.propTypes = {
    auditorias: PropTypes.array.isRequired
};

export default AuditoriaFotografiaList;
