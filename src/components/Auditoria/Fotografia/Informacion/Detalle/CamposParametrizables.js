import React,{Component} from 'react';



class CamposParametrizables extends Component {

  constructor(props) {
    super(props);
    this.Campos = this.Campos.bind(this)
  }

  Campos() {

  }
  render () {
    const detallePartida = this.props.detallePartida;
    if(detallePartida){


      return(
        <div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <p>Detalle de la Partida</p>
                  <div className="panel-action-icons">
                    <i className="fa fa-eraser" onClick={this.props.clearForm} title="Limpiar sección"></i>
                    <i className="fa fa-toggle-up" onClick={this.props.toggleForm}></i>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-12">

                      {Object.keys(detallePartida).map(function(key,index) {

                        let Name = key.replace( /([A-Z])/g, " $1" );
                        let fieldName = Name.charAt(0).toUpperCase() + Name.slice(1);
                        return (
                          <div key={index} className="col-md-4" style={{marginBottom:'20px'}}>
                            <label htmlFor={fieldName} className="col-sm-6 col-form-label">{fieldName}:</label>
                            <div className="col-sm-6">
                              <input name={key} id={key} className="form-control input-sm" value={detallePartida[key]}/>
                            </div>
                          </div>

                        );
                      })}


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div>

        </div>
      );
    }
  }
}

export default CamposParametrizables;
