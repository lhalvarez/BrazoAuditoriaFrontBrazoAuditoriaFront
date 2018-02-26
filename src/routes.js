// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Page404 from './components/Page404';

// Container
import Home from './components/Home';
import Usuarios from './components/ListaUsuarios';


import cargaAuditoria from './containers/cargaAuditoria';
import validacionPartidas from './containers/validacionPartidas';
import salidaPartidas from './containers/salidaPartidas';


import AuditoriaFisicaAbierta from './containers/AuditoriaFisicaAbierta';
import AuditoriaFisicaCerrada from './containers/AuditoriaFisicaCerrada';
import AuditoriaFotografia from './containers/AuditoriaFotografia';
import AuditoriaPrendas from './containers/AuditoriaPrendas';

const AppRoutes = () =>
	<App>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/cargar-partidas" component={cargaAuditoria} />
			<Route exact path="/validacion-partidas" component={validacionPartidas} />
			<Route exact path="/salida-partidas" component={salidaPartidas} />
			<Route exact path="/auditoria-fisica-caja-abierta" component={AuditoriaFisicaAbierta} />
			<Route exact path="/auditoria-fisica-caja-cerrada" component={AuditoriaFisicaCerrada} />
			<Route exact path="/auditoria-fotografia" component={AuditoriaFotografia} />
			<Route exact path="/auditoria-salida-prendas" component={AuditoriaPrendas} />
			<Route exact path="/usuarios" component={Usuarios} />
			<Route component={Page404} />
		</Switch>
	</App>;

export default AppRoutes;
