import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '../views/404.vue'

import Index from '@/views/Index.vue'

import GoodsHome from '../views/goods/Home.vue'
import GoodsList from '../views/goods/GoodsList.vue'
import Classify from '../views/goods/Classfiy.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    }, {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/goods/',
      component: GoodsHome,
      children: [
        { path: 'goods-list', component: GoodsList },
        { path: 'classify', component: Classify }
      ]
    }
  ]
})
