// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // 引入normalize重置样式文件
import 'vant/lib/vant-css/index.css' // 引入vant的css文件
import * as filters from '@/utils/filters'

Vue.config.productionTip = false

/** 注册全局filters */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
