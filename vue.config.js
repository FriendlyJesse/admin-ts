// eslint-disable-next-line
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '炒鸡后台'
        return args
      })
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 路径指向本地主机地址及端口号
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api': '/' // 路径转发代理
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': { // 注入全局变量
      preProcessor: 'scss',
      patterns: [
        // 加上自己的文件路径，不能使用别名
        path.resolve(__dirname, './src/styles/_variable.scss'),
      ]
    }
  }
}
