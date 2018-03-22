const webpack = require('webpack')

module.exports = {
  env: {
    BASE_API: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer',
    UPLOAD_API: 'http://localhost:8080'
  },
  head: {
    title: '商城首页-Javashop多店铺示例商城',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: '最好的Java网店系统,Java多用户商城,Java商城定制开发' },
      { hid: 'description', name: 'description', content: 'Javashop提供优质的电子商务解决方案，提供最好的Java网店系统、Java多用户商城、Java商城定制开发。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_461357_69d3rq6qvn0tqpvi.css' }
    ],
    script: [
      { type: 'text/javascript', src: 'https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js' },
      { type: 'text/javascript', src: '/layer/layer.js' }
    ]
  },
  loading: { color: '#29d' },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: {
      allChunks: true
    },
    vendor: ['axios'],
    plugins: [],
    publicPath: ''
  },
  css: [
    '~assets/styles/normalize.css',
    '~assets/styles/base.css',
    '~assets/styles/page-transletion.scss'
  ],
  plugins: [
    { src: '~plugins/vue-layer', ssr: false },
    { src: '~plugins/vue-lazyload', ssr: true },
    { src: '~plugins/vue-components', ssr: true },
    { src: '~plugins/vue-filters', ssr: false }
  ],
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  transition: 'page'
}
