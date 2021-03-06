/*eslint-disable no-var*/

var path = require('path');
var AureliaWebpackPlugin = require('aurelia-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var webpack = require('webpack');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  },
  entry: {
    main: [
      './src/main'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new AureliaWebpackPlugin({
      includeSubModules: [{
          moduleId: 'aurelia-dialog'
        }, 
      ],
      contextMap: {
        'aurelia-dialog': 'node_modules/aurelia-dialog/dist/commonjs/aurelia-dialog.js'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new ProvidePlugin({
      Promise: 'bluebird'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015-loose', 'stage-1'],
        plugins: ['transform-decorators-legacy']
      }
    }, {
      test: /\.css?$/,
      loader: 'style!css'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|gif|jpg|ico)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff2'
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }]
  }
};
