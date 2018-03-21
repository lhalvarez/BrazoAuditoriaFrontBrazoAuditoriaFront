// Dependencies
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { TITLES } from '../../constants';
import ContainerTitle from '../Global/ContainerTitle';
import {buscaDatosUsuarioSesion} from './actions';
import {Table, Panel, Form, FormControl, Row, Col, FormGroup, ControlLabel, Well} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {Doughnut} from 'react-chartjs-2';

class Home extends Component {


  constructor(){

    super();

    this.state = {
      title: TITLES.INICIO.PAGINA_INICIO,
    };

  }


  componentDidMount(){

    this.props.buscaDatosUsuarioSesion();


  }


  render() {
    const data = {
      labels: [
        'Partidas Pendientes',
        'Partidas Completas'
      ],
      datasets: [{
        data: [300, 50],
        backgroundColor: [
          '#94142E',
          '#E0E0E0'
        ],
        hoverBackgroundColor: [
          '#C12127',
          '#c6c4c4'
        ]
      }]
    };
    const data1 = {
      labels: [
        'Archivos Pendientes de Validación',
        'Archivos Validados'
      ],
      datasets: [{
        data: [200, 230],
        backgroundColor: [
          '#94142E',
          '#E0E0E0'
        ],
        hoverBackgroundColor: [
          '#C12127',
          '#c6c4c4'
        ]
      }]
    };
    console.log('Se comienza a establecer los datos del usuario para ', this.props );
    //const { title } = this.state ;
    const { title } = this.state;
    return (
      <div className="Home">
        <ContainerTitle title={title + this.props.usuario.nombreCompleto} />
        <Row>
          <Form horizontal>
          <Row>
            <Col xs={6}>
              <Panel className="panel panel-primary">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Perfil de Usuario</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Row>
                    <Col xs={2}>
                      <i style={{fontSize: '130px'}} className="fa fa-male"></i>
                    </Col>
                    <Col xs={10}>
                      <Form horizontal>
                        <FormGroup controlId="formHorizontalNombre">
                          <Col  sm={3}>
                            Nombre:
                          </Col>
                          <Col sm={9}>
                            {this.props.usuario.nombreCompleto}
                          </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                          <Col  sm={3}>
                            E-Mail:
                          </Col>
                          <Col sm={9}>
                            {this.props.usuario.correo}
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSucursal">
                          <Col  sm={3}>
                            Sucursal:
                          </Col>
                          <Col sm={9}>
                            {this.props.usuario.sucursal}
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPerfil">
                          <Col  sm={3}>
                            Perfil:
                          </Col>
                          <Col sm={9}>
                            {this.props.usuario.sucursal}
                          </Col>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </Panel.Body>
              </Panel>
            </Col>
            <Col xs={6}>
              <Panel className="panel panel-primary">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Accesos Directos</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Row>
                      <Col sm={12}>
                        <Table responsive>

                          <tbody>
                            <tr>
                              <td>Auditoria Fisica Caja Abierta</td>
                              <td>
                                <NavLink exact to='/auditoria-fisica-caja-abierta'>
                                  <i  style={{color: 'green'}} className="fa fa-arrow-right fa-2x"></i>
                                </NavLink>
                              </td>
                            </tr>
                            <tr>
                              <td>Auditoria Fisica Caja Cerrada</td>
                              <td>
                                <NavLink exact to='/auditoria-fisica-caja-cerrada'>
                                  <i  style={{color: 'green'}} className="fa fa-arrow-right fa-2x"></i>
                                </NavLink>
                              </td>
                            </tr>
                            <tr>
                              <td>Auditoria Fotografia</td>
                              <td>
                                <NavLink exact to='/auditoria-fotografia'>
                                  <i  style={{color: 'green'}} className="fa fa-arrow-right fa-2x"></i>
                                </NavLink>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                  </Row>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Panel className="panel panel-primary">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">DashBoard</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Row>
                    <Col xs={6}>
                      <Doughnut ref='chart' data={data} />
                    </Col>
                    <Col xs={6}>
                      <Doughnut ref='chart' data={data1} />
                    </Col>
                  </Row>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
          </Form>
        </Row>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    usuario: state.homeReducer.usuario
  }
}

export default connect(mapStateToProps,{buscaDatosUsuarioSesion})(Home);
