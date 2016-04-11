const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  // Configure Source Map Devtools
  devtool: 'cheap-module-eval-source-map',
  // Configure Entry
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js')
  ],
  // Configure Module Loaders
  module: {
    loaders: [
      {
        test: /\.(gif|jpe?g|png|woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js$/,
        loaders: ['babel?cacheDirectory'],
        exclude: path.resolve(__dirname, '/node_modules/')
      },
      {
        test: /\.(scss|sass|css)$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  // Post CSS Configuration
  postcss() {
    return [autoprefixer];
  },
  // Configure Webpack Dev Server
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    host: process.env.HOST,
    port: process.env.PORT
  },
  // Configure Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  // Configure plugins
  plugins: [
    // Hot Reload Plugin
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    // Define environment
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),

    // Optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  progress: true,
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
