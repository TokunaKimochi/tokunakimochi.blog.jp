const path = require('path');

module.exports = {
  // エントリーポイントの指定
  entry: './scripts/main.js',
  // ファイルの出力設定
  output: {
    // 出力先のフォルダー名
    path: path.resolve(__dirname, 'public'),
    // 出力ファイル名
    filename: 'tokunakimochi-blog-jp.min.js'
  },

  externals: {
    jquery: 'jQuery',
    hammerjs: 'Hammer'
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }

};
