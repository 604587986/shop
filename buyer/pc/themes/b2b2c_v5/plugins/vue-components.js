import Vue from 'vue'

import {
  Logo,
  Category,
  Footer,
  Header,
  Shortcut
} from '@/components'

/** 注册全局组件 */
Vue.component(Logo.name, Logo)
Vue.component(Category.name, Category)
Vue.component(Footer.name, Footer)
Vue.component(Header.name, Header)
Vue.component(Shortcut.name, Shortcut)
