// Dependencies
import express from 'express';

import { api } from '../constants/api';

// Express Router
const Router = express.Router();
const rp = require('request-promise');
const Joi = require('joi');

// Validaciones
const schema = Joi.object().keys({
	path: Joi.string().required()
});

Router.get('/',async (req,res) => {
  console.log('RECIBIDO');
	/*let validationResult = Joi.validate(req.query,schema);
	if(validationResult.error)
		return res.status(400).end(); */

	/* Petición al servicio */
  console.log('RECIBIDO x2');
  let params = '';
  console.log('RECIBIDO x3');

  if(req.query.params){
    params = JSON.parse(req.query.params);
    console.log('RECIBIDO x4');
  }
  console.log('RECIBIDO x5');
  console.log(params);
  let path = `${api.baseURL}${req.query.path}`;
  console.log('RECIBIDO x6');
  if(req.query.id){
    path = path+'/'+req.query.id;
    console.log('RECIBIDO x7');
  }

  console.log(path);
	let requestSettings = {
		uri: path,
		method: 'GET',
    qs:params,
		json: true,
		headers: { 'Authorization': req.headers.authorization }
	};
  console.log(requestSettings);

	let response = await rp(requestSettings)
    .then(function (parsedBody) {
      res.status(parsedBody.code).json(parsedBody);
  })
    .catch(function (err) {
      console.log(err.error);
      res.status(err.error.status).json(err.error);
    });
  console.log(response);

});


Router.post('/',async (req,res) => {
	let validationResult = Joi.validate(req.query,schema);
	if(validationResult.error)
		return res.status(400).end();

	const { body } = req;

	/* Petición al servicio */
	let requestSettings = {
		uri: `${api.baseURL}${req.query.path}`,
		method: 'POST',
		json: true,
		body,
		headers: { 'Authorization': req.headers.authorization }
	};

	let response = await rp(requestSettings);

	res.status(response.code).json(response);
});

Router.put('/',async (req,res) => {
	let validationResult = Joi.validate(req.query,schema);
	if(validationResult.error)
		return res.status(400).end();

	const { body } = req;

	/* Petición al servicio */
	let requestSettings = {
		uri: `${api.baseURL}${req.query.path}`,
		method: 'PUT',
		json: true,
		body,
		headers: { 'Authorization': req.headers.authorization }
	};

	let response = await rp(requestSettings);

	res.status(response.code).json(response);
});

Router.patch('/',async (req,res) => {
	let validationResult = Joi.validate(req.query,schema);
	if(validationResult.error)
		return res.status(400).end();

	const { body } = req;

	/* Petición al servicio */
	let requestSettings = {
		uri: `${api.baseURL}${req.query.path}`,
		method: 'PATCH',
		json: true,
		body,
		headers: { 'Authorization': req.headers.authorization }
	};

	let response = await rp(requestSettings);

	res.status(response.code).json(response);
});

Router.delete('/',async (req,res) => {
	let validationResult = Joi.validate(req.query,schema);
	if(validationResult.error)
		return res.status(400).end();

	const { body } = req;

	/* Petición al servicio */
	let requestSettings = {
		uri: `${api.baseURL}${req.query.path}`,
		method: 'DELETE',
		json: true,
		body,
		headers: { 'Authorization': req.headers.authorization }
	};

	let response = await rp(requestSettings);

	res.status(response.code).json(response);
});

export default Router;
