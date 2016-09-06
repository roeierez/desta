const webpack = require('webpack');
const express = require('express');
const http = require('http' );
const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy');
const open = require('open');
const app = express();
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const argv = require('yargs')
    .usage('Usage: node webpack-dev-server.js [options]')
    .describe('host', 'webpack devserver host').default('host', 'test.robustico.com')
    .describe('port', 'webpack devserver port').default('port', 3000)
    .describe('proxy-host', 'proxy server host').default('proxy-host', '127.0.0.1')
    .describe('proxy-port', 'proxy server port').default('proxy-port', 3001)
    .describe('browse', 'open default browser with webpack devserver url').default('browse', false)
    .help('h').alias('h', 'help')
    .argv;

const host = argv['host'];
const port = argv['port'];
const proxyHost = argv['proxy-host'];
const proxyPort = argv['proxy-port'];
const browse = argv['browse'];

const configureWebpack = app => {
    console.log('[webpack-dev-server] configuring webpack...')

    webpackConfig.devtool = 'eval-source-map';
    webpackConfig.entry.app.push(
        `webpack-hot-middleware/client?path=/__webpack_hmr`,
        `webpack/hot/dev-server`
    );
    // webpackConfig.plugins.push(
    //     new webpack.HotModuleReplacementPlugin(),
    //     new webpack.NoErrorsPlugin()
    // );
    // webpackConfig.module.loaders.unshift( {
    //     test: /\.jsx$/,
    //     exclude: /(node_modules|bower_components|legacy)/,
    //     loader: 'react-hot'
    // });

    const compiler = webpack(webpackConfig);

    app.use(WebpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: 'client',
        hot: true,
        quiet: false,
        noInfo: true,
        lazy: false,
        stats: {
            colors: true
        }
    }));

    app.use(WebpackHotMiddleware(compiler, {log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000}));
}

const configureProxyServer = (app, proxyHost, proxyPort) => {
    console.log(`[webpack-dev-server] creating proxy to ${proxyHost}:${proxyPort}`);

    const proxy = httpProxy.createProxyServer({});
    proxy.on('error', function (e) {
        console.error('[webpack-dev-server] error in proxy ->', e.message);
    });

    app.use(function (req, res, next) {
        if (/(api)/.test(req.url)) {
            const url = `http://${proxyHost}:${proxyPort}`;
            return proxy.web(req, res, {target: url});
        }
        next();
    })

    app.use(function (req, res, next) {
        res.redirect(`/?path=${req.originalUrl}`);
    });
}

const runServer = (app, host, port) => {
    console.log(`[webpack-dev-server] creating webpack dev server...${host}:${port}`);

    new http.Server(app)
        .listen(port)
        .on('listening', () => {
            console.log('[webpack-dev-server] server started')
            browse && open(`https://${host}:${port}/?dev`);
        });
}

configureWebpack(app);
configureProxyServer(app, proxyHost, proxyPort);
runServer(app, host, port);
