const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  // ローカル開発用環境を立ち上げる
  // ブラウザで http://localhost:5000/ でアクセスできるようになる
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      watch: true,
    },
    port: 5000,
  }
});
