import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const deleteTarget = {
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class DeleteDrop extends Component{
	render(){
		const { isOver, canDrop, connectDropTarget } = this.props;
		
		return connectDropTarget(
            <div className="pull-right" id="deleteDrop-wrapper">
                <i style={ {color: canDrop && '#94142E'} } className="fa fa-2x fa-trash"></i>
                <div style={ {display: canDrop && 'block'} } className="deleteDrop-popover">
                    <div className="deleteDrop-popover-content">
                        <p>Arrastre para Eliminar</p>
                        <div className="arrow-right"></div>
                    </div>
                </div>
            </div>
        );
	}
}

export default DropTarget('row',deleteTarget,collect)(DeleteDrop);