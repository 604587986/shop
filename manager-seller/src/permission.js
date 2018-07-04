import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { MessageBox } from 'element-ui'
import Storage from '@/utils/storage'
import { domain } from '~/ui-domain'

router.beforeEach((to, from, next) => {
  NProgress.start()
  const user = Storage.getItem('user')
  if (!user) {
    window.location.href = `${domain.buyer_pc}/login?forward=${window.location.href}`
  } else {
    if (JSON.parse(user).have_shop) {
      next()
    } else {
      MessageBox.alert('您还没有店铺，快去申请开店吧！', '权限错误', {
        type: 'error',
        callback: () => {
          window.location.href = `${domain.buyer_pc}/shop/apply`
        }
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
