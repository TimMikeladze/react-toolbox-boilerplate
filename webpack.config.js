const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WatchIgnorePlugin = require('watch-ignore-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.resolve(__dirname, './src/ui/index.js'),
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
    ],
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "theme/_config.scss";',
    includePaths: [path.resolve(__dirname, './src/ui')],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
    new WatchIgnorePlugin([
      path.resolve(__dirname, './node_modules/'),
      path.resolve(__dirname, './src/api/'),
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/ui/index.html'),
    }),
  ],
  devServer: {
    proxy: {
    },
    historyApiFallback: {
      index: '/',
    },
  },
};
