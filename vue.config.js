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
  }
}