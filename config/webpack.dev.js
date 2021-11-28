const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development', // this sets process.env.NODE_ENV = development
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    historyApiFallback: true,
  },
});
