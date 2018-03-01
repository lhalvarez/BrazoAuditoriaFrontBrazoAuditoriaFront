// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Assets


class Formulario extends Component {

  constructor(props, context) {
    super(props, context);

  }


  handleSubmit(e){
    e.preventDefault();
  }


  render() {


    return (
      <div className="form">
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label htmlFor="sucursal" className="col-sm-2 control-label">Sucursal</label>
        <div className="col-sm-10">
          <input type="email" className="form-control" id="sucursal" />
        </div>
        </div>
        <div className="form-group">
        <label htmlFor="creador" className="col-sm-2 control-label">Creador</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="creador" />
        </div>
        </div>
        <div className="form-group">
        <label htmlFor="partidas" className="col-sm-2 control-label">Partidas</label>
        <div className="col-sm-10">
          <input type="number" className="form-control" id="partidas" />
        </div>
        </div>
        <div className="form-group">
        <label htmlFor="documento" className="col-sm-2 control-label">Documento</label>
        <div className="col-sm-10">
          <input type="file" className="form-control" id="documento" />
        </div>
        </div>
        <div className="form-group">
        <div className="center">
          <button type="submit" className="btn btn-primary">Cargar</button>
        </div>
        </div>
      </form>
      </div>
    );
  }
}

export default Formulario;
