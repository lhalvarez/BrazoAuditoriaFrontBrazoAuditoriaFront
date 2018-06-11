import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { history } from '../../history';
import { store } from '../../store';
import { showHelpPane } from './GlobalActions';

class Menu extends Component{
	static propTypes = {

  	};

  	constructor(){
  		super();

  		this.state = {
            pageTitle: ''
        };

  		this.handleStoreChanges = this.handleStoreChanges.bind(this);
      this.renderMenu = this.renderMenu.bind(this);
      this.toggleHelp = this.toggleHelp.bind(this);

  		this.unsuscribe = store.subscribe(this.handleStoreChanges);
  	}

  	handleStoreChanges(){
  		if(store.getState().session.verifiedMenu)
  			this.setState({ verifiedMenu: store.getState().session.verifiedMenu });

      if(store.getState().nav.pageTitle != this.state.pageTitle)
          this.setState({ pageTitle: store.getState().nav.pageTitle });
  	}

    toggleHelp(){
      this.props.showHelpPane();
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
            					<NavLink exact location={history.location} to={option.url}><i className={"fa fa-fw" + (option.ico != 'ico' ? (' '+option.ico) : '')}></i> {option.descripcion}</NavLink>
            					:
            					<a href={option.url}><i className={"fa fa-fw" + (option.ico != 'ico' ? (' '+option.ico) : '')}></i> {option.descripcion}{(option.submenus) && <span className="fa arrow"></span>}</a>
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
            										<NavLink exact location={history.location} to={secondOption.url}><i className={"fa fa-fw" + (secondOption.ico != 'ico' ? (' '+secondOption.ico) : '')}></i> {secondOption.descripcion}</NavLink>
            										:
            										<a href={secondOption.url}><i className={"fa fa-fw" + (secondOption.ico != 'ico' ? (' '+secondOption.ico) : '')}></i> {secondOption.descripcion}{(secondOption.submenus) && <span className="fa arrow"></span>}</a>
            									}
            									{
            										(secondOption.submenus)
            										&&
            										<ul className="nav nav-third-level">
            											{
            												secondOption.submenus.map(thirdOption => (
            													<li key={thirdOption.idMenu}>
            														<NavLink exact location={history.location} to={thirdOption.url}><i className={"fa fa-fw" + (thirdOption.ico != 'ico' ? (' '+thirdOption.ico) : '')}></i> {thirdOption.descripcion}</NavLink>
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
            <div className="container-fluid">
              <div className="row">
                <div className="downbar-text col-sm-11">
                  <h3><b>{this.state.pageTitle}</b></h3>
                </div>
                <div className="help-icon col-sm-1">
                  <i onClick={this.toggleHelp} data-toggle="tooltip" data-placement="bottom" title="Ayuda" className="fa fa-question-circle fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
			</div>
		);
	}
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps,{showHelpPane})(Menu);
