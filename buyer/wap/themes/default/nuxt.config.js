const webpack = require('webpack')

module.exports = {
  env: {},
  head: {
    title: 'Javashop多店铺示例商城',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
      { name: 'renderer', content: 'webkit' },
      { name: 'force-rendering', content: 'webkit' },
      { hid: 'X-UA-Compatible', 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_461357_2yritt4lz7c.css' }
    ],
    script: [
      { type: 'text/javascript', src: '/jquery.min.js' },
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
      if (isClient) {
        config.entry['polyfill'] = ['babel-polyfill']
      }
      config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
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
          },
        "import",
          {
            "libraryName": "vant",
            "libraryDirectory": "es",
            "style": true
          }]
      ]
    },
    plugins: [],
    publicPath: '/'
  },
  css: [
    '~assets/styles/normalize.css',
    '~assets/styles/base.css',
    '~assets/styles/page-transletion.scss',
    'swiper/dist/css/swiper.css',
    'vant/lib/vant-css/index.css',
    'vant/lib/vant-css/icon-local.css'
  ],
  plugins: [
    { src: '~plugins/vue-layer', ssr: false },
    { src: '~plugins/vue-lazyload', ssr: true },
    { src: '~plugins/vue-components', ssr: true },
    { src: '~plugins/vue-filters', ssr: true },
    { src: '~plugins/vue-mixin', ssr: true },
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/vue-vant', ssr: true },
    { src: '~plugins/vue-swiper', ssr: false }
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
