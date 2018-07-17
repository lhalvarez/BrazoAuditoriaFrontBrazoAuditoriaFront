/*
* Servicio para realizar llamadas a la capa local construida en node
* */

import requestApi from './requestApi';
import { store } from '../../store';

function authHeader(){
  const DU = store.getState().session.detalleUsuario;
  let tokens = `${DU.usuario}:${DU.nombreCompleto}`;
  return `Basic ${window.btoa(tokens)}`;
}

function get(path){
	return requestApi({
		url: '/api/servicios',
		params: { path },
		method: 'GET',
		headers: { Authorization: authHeader() }
	});
}

function post(path,data = {}){
	return requestApi({
		url: '/api/servicios',
		params: { path },
		method: 'POST',
		headers: { Authorization: authHeader() },
		data
	});
}

function put(path,data = {}){
	return requestApi({
		url: '/api/servicios',
		params: { path },
		method: 'PUT',
		headers: { Authorization: authHeader() },
		data
	});
}

function patch(path,data = {}){
	return requestApi({
		url: '/api/servicios',
		params: { path },
		method: 'PATCH',
		headers: { Authorization: authHeader() },
		data
	});
}

function destroy(path,data = {}){
	return requestApi({
		url: '/api/servicios',
		params: { path },
		method: 'DELETE',
		headers: { Authorization: authHeader() },
		data
	});
}

export default { get,post,put,patch,destroy };