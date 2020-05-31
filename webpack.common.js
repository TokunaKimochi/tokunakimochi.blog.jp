const path = require('path');

module.exports = {
  // エントリーポイントの指定
  entry: {
    'tokunakimochi-blog-jp.iife': './scripts/escape-kaomoji.iife.js',
    'tokunakimochi-blog-jp': './scripts/main.js',
  },
  // ファイルの出力設定
  output: {
    // 出力先のフォルダー名
    path: path.resolve(__dirname, 'public'),
    // 出力ファイル名 [name] はエントリーのキー
    filename: '[name].min.js'
  },

  externals: {
    jquery: 'jQuery',
    hammerjs: 'Hammer',
    webfontloader: 'WebFont',
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMaps: true,
          },
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

};
