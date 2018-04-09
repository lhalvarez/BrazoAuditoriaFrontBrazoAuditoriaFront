/*
* SE GENERA UN SERVICIO CON MÉTODOS GENERICOS PARA
* REALIZAR LAS PRINCIPALES OPERACIONES
* */

import requestApi from './requestApi';


function getById(endpoint, id){

  return requestApi({

    url: `${endpoint}/${id}` ,
    method: 'GET'

  });

}

function getAll(endpoint, params){

  return requestApi({

    url: `${endpoint}` ,
    method: 'GET',
    params: params

  });

}

function save(endpoint, params){

  
  var obj = toObject(params);

  return requestApi({
    url: `${endpoint}`,
    method: 'POST',
    data: params

  });

}

function update(endpoint, params){
  return requestApi({
    url: endpoint,
    method: 'PUT',
    params: params

  });
}

function destroy(endpoint, params){
  return requestApi({
    url: `${endpoint}`,
    method: 'DELETE',
    data: params
  });
}

function fetchBuffer(endpoint,body){
  return requestApi({
    url: `${endpoint}`,
    responseType: 'arraybuffer',
    method: 'POST',
    data: body
  });
}


const MessageService = {
  getById, save, update, getAll, destroy, fetchBuffer
}


function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}


export default MessageService;
