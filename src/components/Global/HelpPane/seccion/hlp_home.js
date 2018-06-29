import React, { Component } from 'react';
import PropTypes from 'prop-types';


class hlp_home extends Component{

  constructor() {
    super();
  }

  render(){
    const { helpContent } = this.state;

    return(
      <div>
        <h4>Información de Usuario y Resumen de Operaciones</h4>
        <hr/>
        <table style={{border:'0'}} className='rounded-lis'>
          <tr>
            <td>
              <ol>
                <li><p>There is a 2 drink minimum for all guests with reserved seating tickets</p></li>
                <li><p>Dancing is not allowed on the premises. (abc-257 & 253)</p></li>
                <li><p>No alcoholic beverages shall be consumed off the premises. (abc-257 & 253)</p></li>
                <li><p>Flash photography is not permitted in the lounge.</p></li>
                <li><p>Please present tickets upon arrival.</p></li>
              </ol>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

export default hlp_home;
