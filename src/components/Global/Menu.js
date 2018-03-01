import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { store } from '../../store';

class Menu extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.state = {};

  		this.handleStoreChanges = this.handleStoreChanges.bind(this);
  		this.renderMenu = this.renderMenu.bind(this);

  		this.unsuscribe = store.subscribe(this.handleStoreChanges);
  	}

  	handleStoreChanges(){
  		if(store.getState().session.verifiedMenu)
  			this.setState({ verifiedMenu: store.getState().session.verifiedMenu });
  	}

  	componentWillUnmount(){
		this.unsuscribe();
  	}

  	renderMenu(){
  		const { verifiedMenu, menu } = store.getState().session;

  		if(!verifiedMenu)
  			return <ul className="nav" id="side-menu"></ul>;

  		return (
            <ul className="nav" id="side-menu">
            	{
            		menu.map(option => (
            			<li key={option.idMenu}>
            				{
            					(option.url != '#')
            					?
            					<NavLink exact to={option.url}><i className="fa fa-dashboard fa-fw"></i> {option.descripcion}</NavLink>
            					:
            					<a href={option.url}><i className="fa fa-dashboard fa-fw"></i> {option.descripcion}{(option.submenus) && <span className="fa arrow"></span>}</a>
            				}
            				{
            					(option.submenus)
            					&&
            					<ul className="nav nav-second-level">
            						{
            							option.submenus.map(secondOption => (
            								<li key={secondOption.idMenu}>
            									{
            										(secondOption.url != '#')
            										?
            										<NavLink exact to={secondOption.url}>{secondOption.descripcion}</NavLink>
            										:
            										<a href={secondOption.url}>{secondOption.descripcion}{(secondOption.submenus) && <span className="fa arrow"></span>}</a>
            									}
            									{
            										(secondOption.submenus)
            										&&
            										<ul className="nav nav-third-level">
            											{
            												secondOption.submenus.map(thirdOption => (
            													<li key={thirdOption.idMenu}>
            														<NavLink exact to={thirdOption.url}>{thirdOption.descripcion}</NavLink>
            													</li>
            												))
            											}
            										</ul>
            									}
            								</li>
            							))
            						}
            					</ul>
            				}
            			</li>
            		))
            	}
            </ul>
  		);
  	}

	render(){
		return (
			<div>
	            <div className="navbar-default sidebar" role="navigation">
	                <div className="sidebar-nav navbar-collapse">
	                    { this.renderMenu() }
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


/*
* Menú antes de ser recibido por el back end

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

*/
