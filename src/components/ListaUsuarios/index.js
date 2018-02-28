import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Input from 'react-validation/build/input'
import Form from 'react-validation/build/form';
import '../../lib/utils/Validation';
import {consultaUsuarios} from './actions'

const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    console.log("Estoy en la funcion de validacion")
    return <span className="form-error is-visible">Required</span>;
  }
};

class Usuarios extends Component{

  constructor() {
    super();

    this.state = {
      usuarios: [],
      usuario: '',
      estatus: ''
    };

    this.handleUsuario = this.handleUsuario.bind(this);

  }

  dispatchNotification(fn, timeout) {
    setTimeout(() => {
      this.context.store.dispatch(fn(notificationOpts));
    }, timeout);
  }

  componentWillMount(){

    this.props.consultaUsuarios();
    console.log('Estoy apunto de montar el componente');

  }


  handleUsuario(event){

    console.log('Entrando a la funcion');
    this.setState({
      usuario: event.target.value
    });

  }

  buscaUsuario(){

    console.log('Buscando a un usuario', this.state.usuario);
    //this.dispatchNotification(success, 250);
    this.form.validateAll();
  }

  renderUsersList(){

    return this.props.users.map((user) => {

      return(
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
        </tr>
      )
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event);
  };


  render() {

    const {notifications} = this.props;
    return (

      <div>

      <div className="row">

        <div className="col-lg-12">
          <h1 className="page-header">Consulta de Usuarios</h1>
        </div>

      </div>
      <div className="row">
      <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <p>Lista de Usuarios</p>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Id. Usuario</label>
                    <div className="col-sm-8">
                      <Input className="form-control input-sm" name="idUsuario" placeholder="123125" onChange={this.handleUsuario} type="text" validations={[required]}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-sm-12">
                  <div className="pull-right">
                    <button className="btn btn-sm btn-primary" onClick={() => this.buscaUsuario()}>Buscar Usuario</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-condensed">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre Usuario</th>
                </tr>
              </thead>

              <tbody>
              {
                this.renderUsersList()
              }
              </tbody>

            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }

}

function mapStateToProps(state){

  return {
    users: state.user.list
  }

}

export default connect(mapStateToProps,{consultaUsuarios})(Usuarios);
