import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Category from '@/components/Category'
import Cart from '@/components/Cart'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Index
  }, {
    path: '/category',
    name: 'Category',
    component: Category,
  }, {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
  }]
})
