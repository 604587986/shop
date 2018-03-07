// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'vant/lib/vant-css/index.css'
import * as filters from '@/utils/filters'

Vue.config.productionTip = false

/** 注册全局filters */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
