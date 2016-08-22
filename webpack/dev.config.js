const webpack = require('webpack');
const config = require('../config');

const paths = config.get('utils_paths');
module.exports = {
  // devtool: 'source-map',
  devtool: 'eval-cheap-module-source-map',

  resolve: {
    unsafeCache: true,
  },

  reload: true,

  entry: {
    app: [
      "webpack-hot-middleware/client",
      "webpack/hot/dev-server"
    ]
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      loader: 'style-loader!css!postcss-loader!sass-loader',
    }],
  },

  devServer: {
    historyApiFallback: true
  },

  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
  ],
};
