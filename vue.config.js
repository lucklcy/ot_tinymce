// vue.config.js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      // 需要全局导入的less
      patterns: [resolve('src/assets/less/mixins.less')]
    })
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist', //在build时生成文件的目录
  assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('~', resolve('src/components'))
    config.plugin('html').tap(args => {
      args[0].title = 'Tinymce OT 协作问题调研'
      return args
    })
    // 引入全局样式，这样使用定义的less变量时，不用每次引入global.less了
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    //代理 支持webpack-dev-server所有选项
    disableHostCheck: true,
    port: 3300, //端口号
    host: '',
    https: false,
    proxy: {
      // 配置跨域处理 配置多个代理
      // 多环境: 10.114.5.177 h5gateway.ppdapi.com
      '^/internalApi': {
        target: 'http://fat-internalgw.ppdapi.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/internalApi': '/api'
        }
      }
    }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
}
