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
import SalidaPartidas from './containers/salidaPartidas';


import AuditoriaFisicaAbierta from './containers/AuditoriaFisicaAbierta';
import AuditoriaFisicaCerrada from './containers/AuditoriaFisicaCerrada';
import AuditoriaFotografia from './containers/AuditoriaFotografia';
import DetalleAuditoriaFotografia from './containers/AuditoriaFotografia/DetalleAuditoriaFotografia';
import DetallePartidaFotografia from './containers/AuditoriaFotografia/DetallePartidaFotografia';
import AuditoriaPrendas from './containers/AuditoriaPrendas';

const AppRoutes = () =>
	<App>
		<Switch>
			<PrivateRoute exact path="/" component={Home} title="Página de Inicio" />

			//Fotografía
      <PrivateRoute exact path="/cargar-partidas-fotografia" component={cargaAuditoria} title="Carga de Auditoría por Fotografía" />
      <PrivateRoute exact path="/validacion-partidas-fotografia" component={validacionPartidas} title="Validación de Auditoría por Fotografía" />
			//Física
			<PrivateRoute exact path="/cargar-partidas-fisica" component={cargaAuditoria} title="Carga de Auditoría Física" />
			<PrivateRoute exact path="/validacion-partidas-fisica" component={validacionPartidas} title="Validación de Auditoría Física" />
			//Consulta Salida
			<PrivateRoute exact path="/salida-partidas" component={SalidaPartidas} title="Salida de Partidas" />
			<PrivateRoute exact path="/auditoria-fisica-caja-abierta" component={AuditoriaFisicaAbierta} title="Auditoría Física de Caja Abierta" />
			<PrivateRoute exact path="/auditoria-fisica-caja-cerrada" component={AuditoriaFisicaCerrada} title="Auditoría Física de Caja Cerrada" />
			<PrivateRoute exact path="/auditoria-fotografia" component={AuditoriaFotografia} title="Información Auditoría por Fotografía" />
      <PrivateRoute exact path="/detalle-auditoria-fotografia/:idAuditoria" component={DetalleAuditoriaFotografia} title="Información Auditoría por Fotografía" />

      <PrivateRoute exact path="/detalle-partida-fotografia/:idPartida" component={DetallePartidaFotografia} title="Detalle de partida" />

			<PrivateRoute exact path="/auditoria-salida-prendas" component={AuditoriaPrendas} title="Auditoría Salida Prendas" />
			<PrivateRoute exact path="/usuarios" component={Usuarios} title="Lista de Usuarios" />
      <Route exact path="/ingreso" component={SessionInit} />
			<PrivateRoute component={Page404} />
		</Switch>
	</App>;



export default AppRoutes;
