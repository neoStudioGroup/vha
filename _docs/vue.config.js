const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  baseUrl: 'vha',
  outputDir: path.join(__dirname, '..') + '\\docs',
  productionSourceMap: false,
  
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, '..') + '\\docs',
        routes: [ 
          '/', 
          '/aaa', 
          '/bbb' 
        ],
        postProcess(context) {
          // let titles = {
          //   '/': 'Home',
          //   '/aaa': 'Our Story'
          // };
          // let temp_title = titles[context.route]
          // if (!temp_title) {
          //   temp_title = context.route.replace(/\//g, '').replace(/-/g, ' ') + ' 静态文档博客'
          // }
          context.html = context.html.replace(
            /<title>[^<]*<\/title>/i,
            `<title>vha(vueHybridApp) 混合移动开发集成解决方案</title>`
          )
          return context
        }
      })
    ]
  }
}