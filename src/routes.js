// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Helpers
import PrivateRoute from './components/Global/PrivateRoute';

// Components
import App from './components/App';
import Page404 from './components/Page404';

// Container
import Home from './components/Home';
import Usuarios from './components/ListaUsuarios';
import SessionInit from './components/Session/init';

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
			<PrivateRoute exact path="/" component={Home} />
			<PrivateRoute exact path="/cargar-partidas" component={cargaAuditoria} />
			<PrivateRoute exact path="/validacion-partidas" component={validacionPartidas} />
			<PrivateRoute exact path="/salida-partidas" component={salidaPartidas} />
			<PrivateRoute exact path="/auditoria-fisica-caja-abierta" component={AuditoriaFisicaAbierta} />
			<PrivateRoute exact path="/auditoria-fisica-caja-cerrada" component={AuditoriaFisicaCerrada} />
			<PrivateRoute exact path="/auditoria-fotografia" component={AuditoriaFotografia} />
			<PrivateRoute exact path="/auditoria-salida-prendas" component={AuditoriaPrendas} />
			<PrivateRoute exact path="/usuarios" component={Usuarios} />
			<Route exact path="/ingreso" component={SessionInit} />
			<PrivateRoute component={Page404} />
		</Switch>
	</App>;

export default AppRoutes;
