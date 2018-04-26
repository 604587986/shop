const webpack = require('webpack')

module.exports = {
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    /** 基础API */
    BASE_API: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer'
  },
  head: {
    title: '商城首页-Javashop多店铺示例商城',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: '最好的Java网店系统,Java多用户商城,Java商城定制开发' },
      { hid: 'description', name: 'description', content: 'Javashop提供优质的电子商务解决方案，提供最好的Java网店系统、Java多用户商城、Java商城定制开发。' },
      { name: 'renderer', content: 'webkit' },
      { name: 'force-rendering', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_461357_iopkwi8gkd6xbt9.css' }
    ],
    script: [
      { type: 'text/javascript', src: 'https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js' },
      { type: 'text/javascript', src: '/layer/layer.js' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  loading: { color: '#29d' },
  build: {
    analyze: false,
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
    babel: {
      "plugins": [
        ["component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
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
    { src: '~plugins/vue-filters', ssr: true },
    { src: '~plugins/vue-mixin', ssr: true },
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/address-selecter', ssr: false },
    { src: '~plugins/vue-piczoom', ssr: false },
  ],
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  transition: 'page',
  ignorePrefix: '-',
  generate: {
    subFolders: true
  }
}
