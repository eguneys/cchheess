const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/test/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: [path.resolve(__dirname, 'dist')],
    host: '0.0.0.0',
    port: 3000
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'Cchh'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }, plugins: [
    new HtmlWebpackPlugin({
      template: 'src/test/index.html'
    })
  ]
};
