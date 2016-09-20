const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const yargs = require('yargs');
const config = require('../config');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const paths = config.get('utils_paths');
const webapp = yargs.argv.webapp || 'debug';

console.log(`> using ${webapp} web`);

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      paths.project(config.get('dir_src')) + '/index.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: paths.project(config.get('dir_dist')),
    publicPath: '/',
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: paths.src('index.html'),
      hash: true,
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
          {
            from: path.join(paths.project(config.get('dir_src')), 'resources'),
            to: path.join(paths.project(config.get('dir_dist')), 'resources')
          }]),
          new webpack.DefinePlugin({__DEVELOPMENT__: webapp == 'debug'})
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: config.get('utils_aliases')
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'baggage?[file].less'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot',"babel-loader"]
      },
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {test: /\.(png|svg|gif|jpg)(\?.*)?$/, loader: 'url-loader?limit=100000'},
      /* eslint-disable */
      {
        test: /\.woff(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2"
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream"
      },
      {test: /\.eot(\?.*)?$/, loader: "file-loader?prefix=fonts/&name=fonts/[name].[ext]"},
      {test: /config.json/, loader: 'config-loader?target=' + webapp}
      /* eslint-enable */
    ]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})]
};

var override = {};
switch (webapp) {
  case 'debug':
    override = require('./dev.config');
    break;
  case 'production':
    override = require('./prod.config');
    break;
}

module.exports = merge(webpackConfig, override);
