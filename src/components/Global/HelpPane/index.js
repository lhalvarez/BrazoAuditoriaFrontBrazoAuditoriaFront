// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import { store } from '../../../store';
import { history } from '../../../history';
import { hideHelpPane, consultaSeccionAyuda } from '../GlobalActions';


class HelpPane extends Component{
	constructor(){
		super();

		this.state = { helpContent: ''};

		this.handleStoreChanges = this.handleStoreChanges.bind(this);

		this.unsuscribe = store.subscribe(this.handleStoreChanges);
	}


	handleStoreChanges(){

	  let content = '';

		if(store.getState().help.showHelp){
			const {pathname} = history.location;

     // this.props.consultaSeccionAyuda(pathname);

      console.log('Aqui tengo esto', this.props.lista);

      let itemList = this.props.lista.map((info) => {

        return (
          <li><p>{info.comentario}</p></li>
        )

      });

			this.setState({helpContent: (
				<SlidingPane
	                className='some-custom-class'
	                overlayClassName='some-custom-overlay-class'
	                isOpen={ true }
	                title='Sección de Ayuda.'
	                width='600px'
	                onRequestClose={() => this.props.hideHelpPane()}>
	                {      <div>
                    <h4>{this.props.encabezado}</h4>
                    <hr/>
                    <table style={{border:'0'}} className='rounded-lis'>
                      <tr>
                        <td>
                          <ul>
                            {itemList}
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </div>
	                }
	            </SlidingPane>
			)});
		}
		else
			this.setState({helpContent: ''});
	}

	componentDidMount() {
        Modal.setAppElement(this.el);
    }

  componentWillMount(){
    this.props.consultaSeccionAyuda(history.location);
  }

	componentWillUnmount(){
		this.unsuscribe();
	}

	render(){

		const { helpContent, lista, encabezado } = this.state;
		return <div ref={ref => this.el = ref}>{ helpContent }</div>;

	}
}

function mapStateToProps(state){
  return {

    lista: state.help.list,
    encabezado: state.help.nombreSeccion

  }
}

export default connect(mapStateToProps,{ hideHelpPane, consultaSeccionAyuda })(HelpPane);
