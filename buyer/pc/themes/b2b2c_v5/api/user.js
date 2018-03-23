/**
 * 用户信息相关API
 */

import request from '@/utils/request'

/**
 * 登录账户
 * @param params
 * @returns {Promise<any>}
 */
export function login(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'user/login',
      method: 'post',
      data: params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 退出账户
 * @returns {Promise<any>}
 */
export function logout() {
  return new Promise((resolve, reject) => {
    request({
      url: 'user/logout',
      method: 'post'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取当前登录的用户信息
 * @returns {Promise<any>}
 */
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    request({
      url: 'user/info',
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
