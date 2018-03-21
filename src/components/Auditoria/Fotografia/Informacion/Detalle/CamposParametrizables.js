import React,{Component} from 'react';



class CamposParametrizables extends Component {

  constructor(props) {
    super(props);

 }
  render () {
    const campos = this.props.campos;
    return(
      <div>

        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <p>Detalle de la Partida</p>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">

                        {campos.map((campo,index)=>{
                          const {id, nombreSelect, atributos} = campo;

                          return (
                            <div key={id} className="col-md-4">
                                <label htmlFor="metal" className="col-sm-6 col-form-label">{nombreSelect}:</label>
                                <div className="col-sm-6">
                                  <select name={nombreSelect} id={nombreSelect} className="form-control input-sm" >
                                    {atributos.map((atributo,i)=>{
                                      const {value,text} = atributo;
                                      return(
                                        <option value={value} key={i}>{text}</option>
                                      );
                                    })}
                                  </select>
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
  }
}

export default CamposParametrizables;
