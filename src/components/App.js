// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './Global/Header';
import Menu from './Global/Menu';
import Content from './Global/Content';
import Footer from './Global/Footer';
import Notificacion from './Global/Notificacion';
import HelpPane from './Global/HelpPane';

//Resources

import '../public/plugins/bootstrap/dist/css/bootstrap.css';
import '../public/css/auditoria.css';
import '../public/plugins/font-awesome/css/all.css';
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
          <div className="center-block">
          </div>
          <Header />
          <Menu />
        </nav>
        <div id="page-wrapper">
          <Content body = {children} />
        </div>
        <Footer />
        <HelpPane />
      </div>
    );
  }
}

export default App;
