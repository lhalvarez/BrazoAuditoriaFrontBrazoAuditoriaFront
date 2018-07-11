import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const uploadTarget = {
	drop(props, monitor) {
	    props.onFileDrop(monitor.getItem().files);
	}
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

class UploadDropZone extends Component{
	render(){
		const { isOver, canDrop, connectDropTarget } = this.props;
		
		return connectDropTarget(
            <div className="form-control-file text-primary" id="inputDrop" data-title={this.props.fileName}>
            </div>
        );
	}
}

export default DropTarget(NativeTypes.FILE,uploadTarget,collect)(UploadDropZone);