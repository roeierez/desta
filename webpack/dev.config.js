const webpack = require('webpack');

module.exports = {
  // devtool: 'source-map',
  devtool: 'eval-cheap-module-source-map',

  resolve: {
    unsafeCache: true,
  },

  reload: true,

  entry: {
    app: [
      "webpack-hot-middleware/client"
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
