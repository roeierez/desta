import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import fs from 'fs';

// API routes
import routes from './routes.js';
var Facebook = require('facebook-node-sdk');
var session = require('express-session');

const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.js');
const compiler = webpack(webpackConfig);

const app = new Express();
const server = new http.Server(app);
const connect = require('./lib/mongo');
const isProduction = process.env.NODE_ENV == 'production';

var storage = null;

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(Facebook.middleware({ appId: isProduction ? '280958242271322' : '289224691444677', secret: isProduction ? '7e10754c21b67603eeb19dea900d1d07' : 'e2b4625345691924797bfc495078fbc4' }));

app.use(function(req, res, next){
  next();
});
app.use('/api',
    Facebook.loginRequired(),
    (req, res, next) => {
        connect().then(db => {
            req.storage = db;
            next();
        },  next);
    },
    routes,
    (err, req, res) => {
        res.status(err.status || 500).send({error: err});
    }
);

console.error('isProduction ' + isProduction);
console.error(__dirname + `/../${isProduction ? "dist_production" : "dist"}/`);

if (isProduction) {
// Static directory for express
  app.use(Express.static(__dirname + `/../${isProduction ? "dist_production" : "dist"}/`));
} else {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
}

app.use(function (req, res, next) {
  res.redirect(`/?path=${req.originalUrl}`);
});

server.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Api is listening on http://%s:%s', host, port);
});
