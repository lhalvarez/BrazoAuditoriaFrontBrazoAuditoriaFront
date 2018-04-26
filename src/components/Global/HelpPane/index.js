// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import { store } from '../../../store';
import { history } from '../../../history';
import { hideHelpPane } from '../GlobalActions';
import { helpContent } from './helpContent';

class HelpPane extends Component{
	constructor(){
		super();

		this.state = { helpContent: '' };

		this.handleStoreChanges = this.handleStoreChanges.bind(this);

		this.unsuscribe = store.subscribe(this.handleStoreChanges);
	}

	handleStoreChanges(){
		if(store.getState().help.showHelp){
			const {pathname} = history.location;

			this.setState({helpContent: (
				<SlidingPane
	                className='some-custom-class'
	                overlayClassName='some-custom-overlay-class'
	                isOpen={ true }
	                title='Sección de Ayuda.'
	                width='600px'
	                onRequestClose={() => this.props.hideHelpPane()}>
	                { (pathname in helpContent) ? helpContent[pathname] : <div>No hay información para esta sección</div> }
	            </SlidingPane>
			)});
		}
		else
			this.setState({helpContent: ''});
	}

	componentDidMount() {
        Modal.setAppElement(this.el);
    }

	componentWillUnmount(){
		this.unsuscribe();
  	}

	render(){
		const { helpContent } = this.state;

		return <div ref={ref => this.el = ref}>{ helpContent }</div>;
	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps,{ hideHelpPane })(HelpPane);