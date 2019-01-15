// import path from 'path';
// import webpack from 'webpack';
// import webpackConfig from './base';

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./base');

webpackConfig.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['babel-loader']
});

webpackConfig.module.rules.push({
  test: /\.css$/,    
  loaders: ['style-loader', 'css-loader'],
  include: /node_modules/
});

module.exports = Object.assign({}, webpackConfig, {
  devtool: 'source-map',
  entry: './src',
  output: {
    path: path.resolve(__dirname, '../', '.'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
});
