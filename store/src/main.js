// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import App from './App'
import store from './store'
import Foundation from './js/Foundation'
import RegExp from './js/RegExp'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$Foundation = Foundation
Vue.prototype.$RegExp = RegExp

Vue.use(ElementUI)

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
