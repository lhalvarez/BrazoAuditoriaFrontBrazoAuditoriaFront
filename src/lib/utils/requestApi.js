/*
* SE GENERA LA CLASE DE ENSOBRETADO PARA LA UTILERIA AXIOS,
* LA LIBRERIA AXIOS SERA LA RESPONSABLE DE REALIZAR LAS PETICIONES
* HTTP
*
* */


import axios from 'axios';
import config from '../../config';


const client = axios.create({
  baseURL: config.baseUrlBluemix
});

client.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';

client.interceptors.request.use(function (config) {
  console.log('LANZANDO INTERCEPTOR REQUEST;');
  return config;
}, function(err) {
  return Promise.reject(err);
});

const requestApi = function(options, wHeaders = false) {

  const onSuccess = function(response) {
    console.debug('Request Successful!', response);
    console.log('Respuesta correcta, a implementar');

    return wHeaders ? response : response.data;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:',  error.response.status);
      console.error('Data:',    error.response.data);
      console.error('Headers:', error.response.headers);

    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default requestApi;
