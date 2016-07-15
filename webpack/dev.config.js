const webpack = require('webpack');

module.exports = {
  // devtool: 'source-map',
  devtool: 'eval-cheap-module-source-map',

  resolve: {
    unsafeCache: true,
  },

  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server"
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
