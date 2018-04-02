// Dependencies
import express from 'express';

// Express Router
const Router = express.Router();
const rp = require('request-promise');
const Joi = require('joi');

/* Esquema de Validaciones */
const imageRegex = /^.+(\.jpg|\.png|\.gif|\.bmp)$/;

const schema = Joi.object().keys({
	uri: Joi.string().uri().regex(imageRegex).required()
});

Router.post('/',async (req,res) => {
	/* Validaciones */
	let validationResult = Joi.validate(req.body,schema);
	if(validationResult.error)
		return res.status(400).end();

	let requestSettings = {
		uri: req.body.uri,
		method: 'GET',
		encoding: null
	};

	let image = await rp(requestSettings);

	let contentTypes = {
		'.jpg': 'image/jpeg',
		'.png': 'image/png',
		'.bmp': 'image/bmp',
		'.gif': 'image/gif'
	};
	let contentType = contentTypes[imageRegex.exec(req.body.uri)[1]];

	res.writeHead(200, {'Content-Type': contentType });
	res.end(image,'binary');
});

export default Router;