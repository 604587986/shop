/**
 * Created by laiyu on 2018/5/7.
 */

import Vue from 'vue'
import Storage from './storage'
import request from '@/utils/request'

/**
 * 检查token：
 * 1. user/accessToken/refreshToken都不存在。
 *    表示用户没有登录，放行所有API
 * 2. 不存在accessToken，但是user/refreshToken存在。
 *    表示accessToken过期，需要重新获取accessToken。
 *    如果重新获取accessToken返回token失效错误，说明已被登出。
 * @param options
 * @returns {Promise<any>}
 */
export default function checkToken(options) {
  // user
  const user = Storage.getItem('user')
  // 访问Token
  const accessToken = Storage.getItem('accessToken')
  // 刷新Token
  const refreshToken = Storage.getItem('refreshToken')
  // 获取store
  const { $store } = Vue.prototype.$nuxt
  // 返回异步方法
  return new Promise((resolve, reject) => {
    // 1. user/accessToken/refreshToken都没有，放行所有API。
    if (!user && !accessToken && !refreshToken) {
      console.log(options.url + ' | user/accessToken/refreshToken都没有，放行所有API。')
      resolve()
      return
    }
    // 2. 不存在accessToken，但是user/refreshToken存在。
    if (!accessToken && user && refreshToken) {
      // 如果没有刷新token锁，需要刷新token
      // 如果有刷新token锁，则进入循环检测
      if (!window.__refreshTokenLock__) {
        console.log(options.url + ' | 这个请求，需要等待刷新token。')
        window.__refreshTokenLock__ = request({
          url: 'passport/token',
          method: 'post',
          data: { refersh_token: refreshToken }
        }).then(response => {
          $store.dispatch('user/setAccessTokenAction', response.accessToken)
          $store.dispatch('user/setRefreshTokenAction', response.refreshToken)
          window.__refreshTokenLock__ = null
          console.log(options.url + ' | 已拿到新的token。')
          resolve()
        }).catch(error => {
          window.__refreshTokenLock__ = undefined
          $store.dispatch('user/removeUserAction')
          $store.dispatch('user/removeAccessTokenAction')
          $store.dispatch('user/removeRefreshTokenAction')
        })
      } else {
        if (options.dontCheckToken) {
          console.log(options.url + ' | 不需要检查token，直接通过...')
          resolve()
          return
        }
        console.log('进入循环检测...')
        // 循环检测刷新token锁，当刷新锁变为null时，说明新的token已经取回。
        checkLock()
        function checkLock() {
          setTimeout(() => {
            const __RTK__ = window.__refreshTokenLock__
            console.log(options.url + ' | 是否已拿到新的token：', __RTK__ === null)
            if (__RTK__ === undefined) {
              console.log('登录已失效了，不用再等待了...')
              return
            }
            __RTK__ === null
              ? resolve()
              : checkLock()
          }, 300)
        }
      }
      return
    }
    resolve()
  })
}
