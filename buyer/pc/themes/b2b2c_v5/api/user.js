/**
 * 用户信息相关API
 */

import request from '@/utils/request'

/**
 * 登录账户
 * @param params
 * @returns {AxiosPromise}
 */
export function login(params) {
  return request({
    url: 'user/login',
    method: 'post',
    data: params
  })
}

/**
 * 退出账户
 * @returns {AxiosPromise}
 */
export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}

/**
 * 获取当前登录的用户信息
 * @returns {AxiosPromise}
 */
export function getUserInfo() {
  return request({
    url: 'user/info',
    method: 'get'
  })
}

/**
 * 保存用户信息
 * @param params
 * @returns {AxiosPromise}
 */
export function saveUserInfo(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: 'user/info',
    method: 'post',
    data: _formData
  })
}

/**
 * 会员注册【手机】
 * @param params
 */
export function registerByMobile(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: 'http://192.168.2.5:6002/passport/register/pc',
    method: 'post',
    data: _formData
  })
}

/**
 * 手机号码重复校验
 * @param mobile 手机号
 */
export function checkMobileRegistered(mobile) {
  return request({
    url: `http://192.168.2.5:6001/passport/mobile/${mobile}`,
    method: 'get'
  })
}
