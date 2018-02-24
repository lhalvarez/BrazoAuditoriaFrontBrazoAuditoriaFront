// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './Global/Header';
import Menu from './Global/Menu';
import Content from './Global/Content';
import Footer from './Global/Footer';
import Notificacion from './Global/Notificacion'


// Data
import items from '../data/menu';

//Resources
import '../public/css/auditoria.css';
import '../public/plugins/bootstrap/dist/css/bootstrap.min.css'
import '../public/plugins/font-awesome/css/font-awesome.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div id="wrapper" >
        <Notificacion />
        <nav className="mainnav navbar navbar-default navbar-static-top" role="navigation">
          <Header
            items={items}
          />
          <Menu title="Título de la página" />
        </nav>
        <div id="page-wrapper">
          <Content body = {children} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
