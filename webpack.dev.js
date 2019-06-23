const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // ローカル開発用環境を立ち上げる
  // ブラウザで http://localhost:5000/ でアクセスできるようになる
  devServer: {
    contentBase: './public',
    port: 5000
  }
});
