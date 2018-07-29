import router from './router'
import store from './store'
import * as API_shop from '@/api/shop'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { MessageBox } from 'element-ui'
import Storage from '@/utils/storage'
import { domain, api } from '~/ui-domain'
import request from '@/utils/request'

router.beforeEach((to, from, next) => {
  NProgress.start()
  const user = Storage.getItem('user')
  if (!user) {
    window.location.href = `${domain.buyer_pc}/login?forward=${window.location.href}`
  } else {
    request({
      url: api.buyer + '/shops/status',
      method: 'get',
      loading: false
    }).then(response => {
      switch (response) {
        case 'NO_SHOP':
        case 'APPLY':
        case 'APPLYING':
        case 'REFUSED':
          noShop()
          break
        case 'CLOSED':
          shopCloed()
          break
        case 'OPEN':
          shopOpen(next)
          break
      }
    })
  }
})

router.afterEach(() => {
  NProgress.done()
})

const noShop = () => {
  MessageBox.alert('您还没有店铺，快去申请开店吧！', '权限错误', {
    type: 'error',
    callback: () => {
      window.location.href = `${domain.buyer_pc}/shop/apply`
    }
  })
}

const shopCloed = () => {
  MessageBox.alert('您的店铺已被关闭，请联系管理员！', '权限错误', {
    type: 'error',
    callback: () => {
      window.location.href = `${domain.buyer_pc}`
    }
  })
}

const shopOpen = (next) => {
  if (!store.getters.shopInfo) {
    API_shop.getShopData({}).then(response => {
      const { shop_disable } = response
      switch (shop_disable) {
        case 'OPEN':
          store.dispatch('SetShop', response)
          next()
          break
        default:
          next()
      }
    })
  } else {
    next()
  }
}
