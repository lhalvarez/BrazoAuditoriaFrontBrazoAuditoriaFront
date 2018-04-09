// Dependencies
import express from 'express';
import sharp from 'sharp';

// Express Router
const Router = express.Router();
const rp = require('request-promise');
const Joi = require('joi');

/* Esquema de Validaciones */
const imageRegex = /^.+(\.jpg|\.png|\.gif|\.bmp)$/;

const schema = Joi.object().keys({
	uri: Joi.string().uri().regex(imageRegex).required(),
	superiorX: Joi.number().required(),
	superiorY: Joi.number().required(),
	inferiorX: Joi.number().greater(Joi.ref('superiorX')).required(),
	inferiorY: Joi.number().greater(Joi.ref('superiorY')).required()
});

Router.post('/',async (req,res) => {
	/* Validaciones */
	let validationResult = Joi.validate(req.body,schema);
	if(validationResult.error)
		return res.status(400).end();

	/* Petición a la imagen */
	let requestSettings = {
		uri: req.body.uri,
		method: 'GET',
		encoding: null
	};

	let buffer = await rp(requestSettings);

	let croppedImage = await sharp(buffer).extract({
		left: req.body.superiorX,
		top: req.body.superiorY,
		width: (req.body.inferiorX - req.body.superiorX),
		height: (req.body.inferiorY - req.body.superiorY)
	}).toBuffer();

	let contentTypes = {
		'.jpg': 'image/jpeg',
		'.png': 'image/png',
		'.bmp': 'image/bmp',
		'.gif': 'image/gif'
	};
	let contentType = contentTypes[imageRegex.exec(req.body.uri)[1]];

	res.writeHead(200, {'Content-Type': contentType });
	res.end(croppedImage,'binary');
});

export default Router;