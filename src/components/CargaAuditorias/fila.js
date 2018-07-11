import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const rowSource = {
  beginDrag(props, monitor, component) {
    return {};
  },

  endDrag(props, monitor, component) {
  	if(monitor.getDropResult()){
  		const {id, carga} = props.auditoria;
  		props.deleteDoc(carga,id);
  	}
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Fila extends Component{
	render(){
		const {id, carga} = this.props.auditoria;

	    const { isDragging, connectDragSource } = this.props;

		return connectDragSource(
			<tr style={{padding:'15px', opacity: isDragging ? 0.4 : 1}} className={ (carga.estadoCarga && carga.estadoCarga.id === 4) ? 'danger' : '' }>
              <td>{carga.id}</td>
              <td>{carga.nombreArchivo}</td>
              <td>{carga.idSucursal}</td>
              <td>{carga.solicitante}</td>
              <td>{carga.noPartidas}</td>
              <td>Pendiente de autorización</td>
              { (carga.tipoAuditoria.id === 2 || carga.tipoAuditoria.id === 3) && <td>{carga.tipoAuditoria.descripcion}</td> }
              <td>
                <Link to="#" onClick={() => {this.props.deleteDoc(carga,id)} }>
                  <i className="far fa-trash-alt"></i> Eliminar
                </Link>
              </td>
            </tr>
		);
	}
}

export default DragSource('row', rowSource, collect)(Fila);