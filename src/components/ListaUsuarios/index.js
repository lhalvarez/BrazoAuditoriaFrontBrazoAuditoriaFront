import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import store from './store';

class Usuarios extends Component{

  constructor() {
    super();

    this.state = {
      usuarios: [],
      usuario: ''
    };

    store.subscribe(() => {
      this.setState({
        usuarios: store.getState().usuarios
      });
    });


    this.handleUsuario = this.handleUsuario.bind(this);
  }

  componentDidMount(){

    console.log('Estoy apunto de montar el componente');

    store.dispatch({
      type: "CONSULTA_TODOS_USUARIOS",
      usuario: this.state.usuario
    });

  }

  handleUsuario(event){

    console.log('Entrando a la funcion')
    this.setState({
      usuario: event.target.value
    });

  }

  buscaUsuario(){
    console.log('Buscando a un usuario', this.state.usuario);
  }


  render() {
    return (
      <div>
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Consulta de Usuarios</h1>
        </div>
      </div>
      <div className="row">
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
                      <input className="form-control input-sm" placeholder="123125" onChange={this.handleUsuario} type="text"/>
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
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-condensed">

              <tbody>
{/*              {
                this.state.usuarios.map( item =>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                    </tr>
                )
              }*/}
              </tbody>

            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }

}

export default Usuarios;
