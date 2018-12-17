/**
 * 自定义鉴权鉴权，只放出注册登录和商家入驻
 * @param store
 * @param redirect
 * @param route
 * @returns {*}
 */
import { domain } from '~/ui-domain'
export default function ({ store, redirect, route }) {
  const { user } = store.getters
  // 如果没有登录，跳转到登录页
  if (!user) {
    return redirect(`/login?forward=${route.fullPath}`)
  }
  // 如果有店铺，跳转到商家中心
  if (user.have_shop) {
    return redirect(domain.seller)
  }
  //否则跳转到店铺申请页
  return redirect(`/shop/apply`)
}
