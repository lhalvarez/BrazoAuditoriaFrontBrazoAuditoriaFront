import React,{Component} from 'react';
import NumberFormat from 'react-number-format';



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

                        let moneyFields = [
                            'prestamo',
                            'prestamoMaximoSugerido',
                            'prestamoSugerido',
                            'valorComercial',
                            'valorMonte',
                            'costoMetal',
                            'importeGramo'
                        ];
                        let dateFields = [
                            'fechaCreacion',
                            'fechaIngreso',
                            'fechaModificacion'
                        ];
                        let isMoneyField = false;
                        let isDateField = false;
                        isMoneyField = moneyFields.includes(key);
                        isDateField = dateFields.includes(key);

                        let Name = key.replace( /([A-Z])/g, " $1" );
                        let fieldName = Name.charAt(0).toUpperCase() + Name.slice(1);

                        if(isMoneyField){
                          return (
                            <div key={index} className="col-md-4" style={{marginBottom:'20px'}}>
                              <label htmlFor={fieldName} className="col-sm-6 col-form-label">{fieldName}:</label>
                              <div className="col-sm-6">
                                  <NumberFormat disabled="disabled" value={detallePartida[key]?detallePartida[key]:''} className="form-control input-sm" id={key} name={key} thousandSeparator={true} prefix={'$ '}/>
                              </div>
                            </div>
                          );
                        }else if (isDateField) {
                          try {
                            var b = detallePartida[key].split(/\D+/);
                            let dat =  new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
                            let date = new Intl.DateTimeFormat('en-US').format(dat);
                            return (
                              <div key={index} className="col-md-4" style={{marginBottom:'20px'}}>
                                <label htmlFor={fieldName} className="col-sm-6 col-form-label">{fieldName}:</label>
                                <div className="col-sm-6">
                                    <input disabled="disabled" value={date?date:''} className="form-control input-sm" id={key} name={key} />
                                </div>
                              </div>
                            );
                          } catch (e) {
                            return (
                              <div key={index} className="col-md-4" style={{marginBottom:'20px'}}>
                                <label htmlFor={fieldName} className="col-sm-6 col-form-label">{fieldName}:</label>
                                <div className="col-sm-6">
                                  <input disabled="disabled" name={key} id={key} className="form-control input-sm" value={detallePartida[key]?detallePartida[key]:''}/>
                                </div>
                              </div>

                            );
                          } 

                        }else{
                          return (
                            <div key={index} className="col-md-4" style={{marginBottom:'20px'}}>
                              <label htmlFor={fieldName} className="col-sm-6 col-form-label">{fieldName}:</label>
                              <div className="col-sm-6">
                                <input disabled="disabled" name={key} id={key} className="form-control input-sm" value={detallePartida[key]?detallePartida[key]:''}/>
                              </div>
                            </div>

                          );
                        }

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
