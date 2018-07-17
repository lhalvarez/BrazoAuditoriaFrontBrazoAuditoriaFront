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
	let validationResult = Joi.validate(req.query,schema);
	if(validationResult.error)
		return res.status(400).end();

	/* Petición al servicio */
	let requestSettings = {
		uri: `${api.baseURL}${req.query.path}`,
		method: 'GET',
		json: true,
		headers: { 'Authorization': req.headers.authorization }
	};

	let response = await rp(requestSettings);

	res.status(response.code).json(response);
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