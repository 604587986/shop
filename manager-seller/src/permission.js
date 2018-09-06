import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { MessageBox, Message } from 'element-ui'
import Storage from '@/utils/storage'
import * as API_Shop from '@/api/shop'

const whiteList = ['/login']

async function routerBeforeEach(to, from, next) {
  NProgress.start()
  const refreshToken = Storage.getItem('seller_refresh_token')
  if (refreshToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取店铺状态
      const status = await API_Shop.getShopStatus()
      if (status === 'OPEN') {
        const shopInfo = Storage.getItem('seller_shop')
        if (!shopInfo) await store.dispatch('getShopInfoAction')
        if (store.getters.addRouters.length === 0) {
          store.dispatch('GenerateRoutes').then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          }).catch(() => {
            store.dispatch('fedLogoutAction')
            MessageBox.alert('验证失败，请重新登录！', '登录出错', {
              type: 'error',
              callback: () => {
                next({ path: `/login?forward=${location.pathname}` })
              }
            })
          })
        } else {
          next()
        }
      } else if (status === 'CLOSED') {
        MessageBox.alert('您的店铺已被关闭，请联系管理员！', '权限错误', {
          type: 'error',
          callback: () => {
            store.dispatch('fedLogoutAction')
            next({ path: `/login?forward=${location.pathname}` })
          }
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?forward=${location.pathname}`)
      NProgress.done()
    }
  }
}
router.beforeEach(routerBeforeEach)

router.afterEach(NProgress.done)
