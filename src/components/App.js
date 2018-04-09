// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './Global/Header';
import Menu from './Global/Menu';
import Content from './Global/Content';
import Footer from './Global/Footer';
import Notificacion from './Global/Notificacion';

//Resources

import '../public/plugins/bootstrap/dist/css/bootstrap.css';
import '../public/css/auditoria.css';
import '../public/plugins/font-awesome/css/font-awesome.css';
import '../public/plugins/lightbox/dist/ekko-lightbox.css';


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
          <Header />
          <Menu />
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
