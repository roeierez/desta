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
import apiMiddleware from './middleware';
var session = require('express-session');

const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.js');

const app = new Express();
const server = new http.Server(app);
const connect = require('./lib/mongo');
const isProduction = process.env.NODE_ENV == 'production';
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
app.use(session({ secret: 'foo bar' }));

app.use(function(req, res, next){
  next();
});
app.use('/api',
    (req, res, next) => {
        connect().then(db => {
            req.storage = db;
            next();
        },  next);
    },
    apiMiddleware,
    routes,
    (err, req, res) => {
        res.status(err.status || 500).send({error: err});
    }
);

console.error('isProduction ' + isProduction);
console.error(__dirname + `/../${isProduction ? "dist_production" : "dist"}/`);
app.use(Express.static(__dirname + `/../${isProduction ? "dist_production" : "dist"}/`));

// if (isProduction) {
// // Static directory for express
//   app.use(Express.static(__dirname + `/../${isProduction ? "dist_production" : "dist"}/`));
// } else {
//   app.use(require('webpack-dev-middleware')(compiler, {
//     noInfo: true, publicPath: webpackConfig.output.publicPath
//   }));
//
//   app.use(require('webpack-hot-middleware')(compiler, {
//     log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
//   }));
// }

app.use(function (req, res, next) {
  res.redirect(`/?path=${req.originalUrl}`);
});

server.listen(isProduction ? 3000 : 3001, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Api is listening on http://%s:%s', host, port);
});
