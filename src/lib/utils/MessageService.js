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

function getAll(endpoint){

  return requestApi({

    url: `${endpoint}` ,
    method: 'GET'

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


const MessageService = {
  getById, save, getAll
}


function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}


export default MessageService;
