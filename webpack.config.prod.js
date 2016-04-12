const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // Configure Entry
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  // Configure Module Loaders
  module: {
    loaders: [
      {
        test: /\.(gif|jpe?g|png|woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, '/node_modules/')
      },
      {
        test: /\.(scss|sass|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },
  // Post CSS Configuration
  postcss() {
    return [autoprefixer];
  },
  // Configure Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  // Configure plugins
  plugins: [
    // Prevent inline css require in entry chunk
    new ExtractTextPlugin('app.css'),

    // Define environment
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // Optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
