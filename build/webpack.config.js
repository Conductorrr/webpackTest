// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode:'development', // 通过配置mode来告诉webpack当前运行的环境   开发模式
    entry: {
      main: path.resolve(__dirname,'../src/main.js'),    // 入口文件
      header: path.resolve(__dirname, '../src/header.js')
    },
    output: {
      filename: '[name].[hash:8].js',      // 打包后的文件名称
      path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html'), // 模板文件地址
        filename: 'index.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html'), // 模板文件地址
        filename: 'header.html',
        chunks: ['header']
      }),
      new CleanWebpackPlugin()
    ]
}
