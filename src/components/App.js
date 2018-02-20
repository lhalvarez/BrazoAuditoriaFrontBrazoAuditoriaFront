// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';

// Data
import items from '../data/menu';

//Resources
import '../public/plugins/bootstrap/dist/css/bootstrap.min.css'
import '../public/css/auditoria.css';
import '../public/plugins/font-awesome/css/font-awesome.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div id="wrapper" >
            <Header
              title="Titulo de Pagina"
              items={items}
            />
            <div id="page-wrapper">
              <Content body = {children} />
            </div>
          <Footer />
      </div>
    );
  }
}

export default App;
