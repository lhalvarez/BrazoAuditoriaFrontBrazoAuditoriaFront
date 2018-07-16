// Dependencies
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import exphbs from 'express-handlebars';
import cfenv from 'cfenv';
import bodyParser from 'body-parser';


// Config
import config from '../config';

// Webpack Configuration
import webpackConfig from '../../webpack.config.babel';

// API
import usuariosApi from './api/usuarios';
import fotografiaApi from './api/fotografia';
import serviciosApi from './api/servicios';

// Helpers
import * as hbsHelper from '../lib/handlebars';



// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

const appEnv = cfenv.getAppEnv();

// Express app
const app = express();

/* Body Parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Public
app.use(express.static(path.join(__dirname, '../public')));

// Handlebars setup
app.engine(config.views.engine, exphbs({
  extname: config.views.extension,
  helpers: hbsHelper
}));

// View Engine Setup
app.set('views', path.join(__dirname, config.views.path));
app.set('view engine', config.views.engine);

// Webpack Compiler
const webpackCompiler = webpack(webpackConfig);

if (isDevelopment) {
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
}


// API dispatch
app.use('/api/usuarios', usuariosApi);
app.use('/api/fotografia', fotografiaApi);
app.use('/api/servicios', serviciosApi);

// Sending all the traffic to React
app.get('*', (req, res) => {
  res.render('frontend/index', {
    layout: false
  });
});

// Listen port 3000


app.listen(appEnv.port, err => {

  console.log("Es ambiente DESARROLLO: ", isDevelopment)

  console.log("El valor de los datos productivos son: ", appEnv.port)
  console.log("El valor de los datos productivos url: ", appEnv.url)

  if (!err) {
    open(`${appEnv.url}`);
  }
});


