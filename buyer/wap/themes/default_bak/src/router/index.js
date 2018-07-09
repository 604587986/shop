import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
import Home from '@/views/home/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', name: 'Home', component: _import('home/index') },
    { path: '/classify', name: 'Classify', component: _import('classify/classify') },
    { path: '/cart', name: 'Cart', component: _import('cart/cart') },
    { path: '/mine', name: 'Mine', component: _import('mine/mine') }
  ]
})
