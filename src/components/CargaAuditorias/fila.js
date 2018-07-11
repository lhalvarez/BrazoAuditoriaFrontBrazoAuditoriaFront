import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import tabla from "./tabla";

const style = {
  padding: '15px',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: '20rem',
}

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
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}


class Fila extends Component{


  componentDidMount(){
    const img = new Image()
    img.onload = () =>
      this.props.connectDragPreview && this.props.connectDragPreview(img)
    img.src =
    ' data:image/png;base64,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'
  }


	render(){
		const {id, carga} = this.props.auditoria;

	    const { isDragging, connectDragSource } = this.props;

		return connectDragSource(
			<tr style={{...style, padding:'15px', opacity: isDragging && 0.4}} className={ (carga.estadoCarga && carga.estadoCarga.id === 4) ? 'danger' : '' }>
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
