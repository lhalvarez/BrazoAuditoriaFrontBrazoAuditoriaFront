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

function get(path,params){
  console.log(params);
  console.log('PaRAMETROS');

  return requestApi({
    url: '/api/servicios',
    params: { path , params },
    method: 'GET',
    headers: { Authorization: authHeader() }
  });
}

function getById(path, id){

  return requestApi({

    url: '/api/servicios',
    params: { path , id },
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

function upload(path,params,onUploadProgress){
  return requestApi({
    url: `${path}`,
    method: 'POST',
    headers: {
      Authorization: authHeader()
    },
    data: params,
    onUploadProgress
  });
}

function fetchBlob(endpoint, body, wHeaders = true) {
  return requestApi({
    url: endpoint,
    responseType: 'blob',
    method: 'POST',
    headers: {
      Authorization: authHeader()
    },
    data: body
  }, wHeaders);

}

export default { get,getById,post,put,patch,destroy,upload ,fetchBlob};
