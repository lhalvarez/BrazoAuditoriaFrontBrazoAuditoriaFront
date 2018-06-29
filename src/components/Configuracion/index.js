// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContainerTitle from '../Global/ContainerTitle';
import { TITLES, API, NUMERICAS, CONFIG, CATALOGOS, LEYENDAS } from '../../constants';
import CONSTANTES from '../../constants';
import { PanelGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class ComponentConfiguracion extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.state = {
  			title: TITLES.CONFIGURACION.PRINCIPAL,
        api: API,
        numericas: NUMERICAS,
        sesion: CONFIG,
        titulos: TITLES,
        catalogos: CATALOGOS,
        leyendas: LEYENDAS,
        constantes: CONSTANTES
  		};

      this.handleSubmit = this.handleSubmit.bind(this);

  	}

    handleSubmit(e){
      e.preventDefault();
    }

    toggleForm(e){
        let $icon = $(e.target);
        let $panelBody = $icon.parents('.panel').find('.panel-body');
        let $panelFooter = $icon.parents('.panel').find('.panel-footer');

        $panelBody.toggle(() => $icon.toggleClass('fa-angle-up fa-angle-down'));
        $panelFooter.toggle();
    }

    leerConstantes(objeto){
      var rows = [];
      for (var key in objeto) {
        if(typeof objeto[key] == "object"){
          rows.push(
            <ListGroupItem>
              {key}{this.leerConstantes(objeto[key])}
            </ListGroupItem>)
        }
        else{
          rows.push(
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">{key}:</label>
                  <label>{objeto[key]}</label>
                </div>
              </div>
            </div>
          )
        }
      }
      return rows
    }

  	render(){
  		const { title, api, numericas, sesion, titulos, catalogos, leyendas, constantes } = this.state;
      var constantesAPI = this.leerConstantes(api);
      var constantesNUM = this.leerConstantes(numericas);
      var constantesCONF = this.leerConstantes(sesion);
      var constantesTITL = this.leerConstantes(titulos);
      var constantesCAT = this.leerConstantes(catalogos);
      var constantesLEY = this.leerConstantes(leyendas);

  		return (
  			<div>
  				<ContainerTitle title={title} />
          <form onSubmit={this.handleSubmit} ref={el => this.el = el}>
            <div className="row">
              <div className="col-md-12">
                  <div className="panel panel-primary">
                      <div className="panel-heading">
                          <p>Contantes Generales</p>
                          <div className="panel-action-icons">
                              <i className="fas fa-angle-up" onClick={this.toggleForm}></i>
                          </div>
                      </div>
                      <div className="panel-body">
                          <div className="row">
                              <div className="col-md-12">
                                  <PanelGroup accordion id="accordion-example">
                                    <Panel eventKey="1">
                                      <Panel.Heading>
                                        <Panel.Title toggle>API</Panel.Title>
                                      </Panel.Heading>
                                      <Panel.Body collapsible>
                                        <ListGroup>
                                          {constantesAPI}
                                        </ListGroup>
                                      </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="2">
                                      <Panel.Heading>
                                        <Panel.Title toggle>Numéricas</Panel.Title>
                                      </Panel.Heading>
                                      <Panel.Body collapsible>
                                        <ListGroup>
                                          {constantesNUM}
                                        </ListGroup>
                                      </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="3">
                                      <Panel.Heading>
                                        <Panel.Title toggle>Sesión</Panel.Title>
                                      </Panel.Heading>
                                      <Panel.Body collapsible>
                                        <ListGroup>
                                          {constantesCONF}
                                        </ListGroup>
                                      </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="4">
                                      <Panel.Heading>
                                        <Panel.Title toggle>Títulos</Panel.Title>
                                      </Panel.Heading>
                                      <Panel.Body collapsible>
                                        <ListGroup>
                                          {constantesTITL}
                                        </ListGroup>
                                      </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="5">
                                      <Panel.Heading>
                                        <Panel.Title toggle>Catálogos</Panel.Title>
                                      </Panel.Heading>
                                      <Panel.Body collapsible>
                                        <ListGroup>
                                          {constantesCAT}
                                        </ListGroup>
                                      </Panel.Body>
                                    </Panel>
                                    <Panel eventKey="6">
                                      <Panel.Heading>
                                        <Panel.Title toggle>Leyendas</Panel.Title>
                                      </Panel.Heading>
                                      <Panel.Body collapsible>
                                        <ListGroup>
                                          {constantesLEY}
                                        </ListGroup>
                                      </Panel.Body>
                                    </Panel>
                                  </PanelGroup>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="col-md-12">
                  <div className="panel panel-info">
                      <div className="panel-heading">
                          <p>Endpoints de Servicios</p>
                          <div className="panel-action-icons">
                              <i className="fas fa-angle-up" onClick={this.toggleForm}></i>
                          </div>
                      </div>
                      <div className="panel-body">
                          <div className="row">
                              <div className="col-md-12">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </form>
  			</div>
  		);
  	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(ComponentConfiguracion);
