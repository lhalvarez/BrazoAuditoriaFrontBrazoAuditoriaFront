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
import DetalleAuditoriaFotografia from './containers/AuditoriaFotografia/DetalleAuditoriaFotografia';
import AuditoriaPrendas from './containers/AuditoriaPrendas';

const AppRoutes = () =>
	<App>
		<Switch>
			<PrivateRoute exact path="/" component={Home} />

			//Fotografía
      <PrivateRoute exact path="/cargar-partidas-fotografia" component={cargaAuditoria} />
      <PrivateRoute exact path="/validacion-partidas-fotografia" component={validacionPartidas} />
			//Física
			<PrivateRoute exact path="/cargar-partidas-fisica" component={cargaAuditoria} />
			<PrivateRoute exact path="/validacion-partidas-fisica" component={validacionPartidas} />
			//Consulta Salida
			<PrivateRoute exact path="/salida-partidas" component={salidaPartidas} />
			<PrivateRoute exact path="/auditoria-fisica-caja-abierta" component={AuditoriaFisicaAbierta} />
			<PrivateRoute exact path="/auditoria-fisica-caja-cerrada" component={AuditoriaFisicaCerrada} />
			<PrivateRoute exact path="/auditoria-fotografia" component={AuditoriaFotografia} />
      <PrivateRoute exact path="/detalle-auditoria-fotografia/:idAuditoria" component={DetalleAuditoriaFotografia} />
			<PrivateRoute exact path="/auditoria-salida-prendas" component={AuditoriaPrendas} />
			<PrivateRoute exact path="/usuarios" component={Usuarios} />
      <Route exact path="/ingreso" component={SessionInit} />
			<PrivateRoute component={Page404} />
		</Switch>
	</App>;

export default AppRoutes;
