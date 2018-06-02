/*
* SE GENERA UN SERVICIO CON MÉTODOS GENERICOS PARA
* REALIZAR LAS PRINCIPALES OPERACIONES
* */

import requestApi from './requestApi';
import { store } from '../../store';

function getById(endpoint, id){

  return requestApi({

    url: `${endpoint}/${id}` ,
    method: 'GET',
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    }

  });

}

function getAll(endpoint, params){

  return requestApi({

    url: `${endpoint}` ,
    method: 'GET',
    params: params,
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    }

  });

}

function save(endpoint, params){


  var obj = toObject(params);

  return requestApi({
    url: `${endpoint}`,
    method: 'POST',
    data: params,
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    }

  });

}

function update(endpoint, params){
  return requestApi({
    url: endpoint,
    method: 'PUT',
    params: params,
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    }

  });
}

function destroy(endpoint, params){
  return requestApi({
    url: `${endpoint}`,
    method: 'DELETE',
    data: params,
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    }
  });
}

function fetchBuffer(endpoint,body){
  return requestApi({
    url: `${endpoint}`,
    responseType: 'arraybuffer',
    method: 'POST',
    data: body,
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    }
  });
}

function fetchBlob(endpoint, body, wHeaders = true) {
  return requestApi({
    url: endpoint,
    responseType: 'blob',
    method: 'POST',
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    },
    data: body
  }, wHeaders);

}

function upload(endpoint,params,onUploadProgress){
  return requestApi({
    url: `${endpoint}`,
    method: 'POST',
    headers: {
      'Authorization': 'user ' + store.getState().session.detalleUsuario.nombreCompleto
    },
    data: params,
    onUploadProgress
  });
}


const MessageService = {
  getById, save, update, getAll, destroy, fetchBuffer, fetchBlob, upload
}


function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}


export default MessageService;
