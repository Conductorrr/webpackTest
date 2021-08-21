// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development', // 通过配置mode来告诉webpack当前运行的环境   开发模式
  entry: { // 入口文件
    main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')], // babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)，此时我们需要借助babel-polyfill来帮助我们转译    
    header: path.resolve(__dirname, '../src/header.js')
  },
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist') // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板文件地址
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板文件地址
      filename: 'header.html',
      chunks: ['header']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/,
      use: [
        'style-loader', 
        MiniCssExtractPlugin.loader, // 这个插件将(所有)CSS提取到单独的文件中(用外链的形式引入css文件)。它为每个包含CSS的JS文件创建一个CSS文件。
        'css-loader', 
        {
          loader: 'postcss-loader',
          options:{
            postcssOptions: {
              plugins:[require('autoprefixer')] //autofixer是postcss的功能插件。它可以自动在样式中添加浏览器厂商前缀，避免手动处理样式兼容问题
            }
          },
        },
        'less-loader',
      ],
    },
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader', // webpack打包的文件默认是不支持ES6的，我们需要用babel转译。(babel-loader)
        options: {
          presets: ['@babel/preset-env']
        },
      }],
      exclude: /node_modules/,
    },
    ]
  }
}

/*
// 在 Loader 需要传入很多参数时，你还可以通过一个 Object 来描述
use: [
  {
    loader:'babel-loader',
    options:{
      cacheDirectory:true,
    },
    // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
    // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
    enforce:'post'
  },
  // 省略其它 Loader
]
*/