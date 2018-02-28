import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component{
	render(){
		return (
			<div>
	            <div className="navbar-default sidebar" role="navigation">
	                <div className="sidebar-nav navbar-collapse">
	                    <ul className="nav" id="side-menu">
	                        <li>
	                        	<NavLink exact to="/"><i className="fa fa-dashboard fa-fw"></i> Inicio</NavLink>
	                        </li>

	                        <li>
	                            <a href="#"><i className="fa fa-files-o fa-fw"></i> Partidas<span className="fa arrow"></span></a>
	                            <ul className="nav nav-second-level">
	                                <li>
	                                    <a href="/cargar-partidas">Cargar Partidas</a>
	                                </li>
	                                <li>
	                                    <a href="/validacion-partidas">Validación Partidas</a>
	                                </li>
	                                <li>
	                                    <a href="/salida-partidas">Salida de Partidas</a>
	                                </li>
	                            </ul>
	                        </li>

	                        <li>
	                            <a href="#"><i className="fa fa-files-o fa-fw"></i> Auditoría<span className="fa arrow"></span></a>
	                            <ul className="nav nav-second-level">
	                                <li>
	                                    <a href="#">Física<span className="fa arrow"></span></a>
	                                    <ul className="nav nav-third-level">
	                                        <li>
	                                        	<NavLink to="/auditoria-fisica-caja-abierta">Caja Abierta</NavLink>
	                                        </li>
	                                        <li>
	                                        	<NavLink to="/auditoria-fisica-caja-cerrada">Caja Cerrada</NavLink>
	                                        </li>
	                                    </ul>
	                                </li>
	                                <li>
	                                	<NavLink to="/auditoria-fotografia">Fotografía</NavLink>
	                                </li>
	                                <li>
	                                	<NavLink to="/auditoria-salida-prendas">Salida de Prendas</NavLink>
	                                </li>
	                            </ul>
	                        </li>
                        <li>
                          <a href="#"><i className="fa fa-files-o fa-fw"></i> Lista Usuarios<span className="fa arrow"></span></a>
                          <ul className="nav nav-second-level">
                            <li>
                              <NavLink to='/usuarios'>Consulta Usuarios</NavLink>
                            </li>
                          </ul>
                        </li>
	                    </ul>
	                </div>
	            </div>
	            <div className="downbar">
	                <div className="downbar-text">
	                    <h3><b>{this.props.title}</b></h3>
	                </div>

	            </div>
			</div>
		);
	}
}

export default Menu;
