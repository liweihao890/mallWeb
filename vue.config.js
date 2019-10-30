module.exports = {
    //改变端口号
    devServer: {
      open: true,
  
      host: '127.0.0.1',
  
      port: 3000,
  
      https: false,
  
      hotOnly: false,
  
      // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方 
      proxy: null,
  
      before: app => {
      }
    },
  
   // CSS 相关选项
   css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: false,
   
    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {// 给 sass-loader 传递选项
      sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/assets/css/varuables.scss` 这个文件
          prependData: `
          @import "~@/assets/css/base.scss";
          `
      },
      scss: {
        prependData: `@import "~@/assets/css/base.scss";`
      },
    
    },
      // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: false,
      },

  


  
    //webpack配置
    configureWebpack: {
      resolve: {
        //   给路径起别名
        alias: {
          'assets': '@/assets',
          'common': '@/common',
          'components': '@/components',
          'network': '@/network',
          'views': '@/views',
        }
      },
  
    },
  
  }
  