/**
 * Created by andste.cc@gmail.com on 2018/5/2.
 * 用户认证相关API
 */

import request from '@/utils/request'
import Storage from '@/utils/storage'

/**
 * 普通登录
 * @param params
 */
export function login(params) {
  return request({
    url: 'passport/login',
    method: 'get',
    params
  })
}

/**
 * 通过手机号登录
 * @param mobile
 * @param sms_code
 */
export function loginByMobile(mobile, sms_code) {
  return request({
    url: `passport/login/${mobile}`,
    method: 'get',
    params: { sms_code }
  })
}

/**
 * 发送会员注册手机验证码
 * @param mobile
 * @param img_code
 */
export function sendRegisterSms(mobile, img_code) {
  const _formData = new FormData()
  _formData.append('captcha', img_code)
  _formData.append('uuid', Storage.getItem('uuid'))
  return request({
    url: `passport/register/smscode/${mobile}`,
    method: 'post',
    data: _formData
  })
}

/**
 * 发送会员登录手机验证码
 * @param mobile
 * @param img_code
 */
export function sendLoginSms(mobile, img_code) {
  const _formData = new FormData()
  _formData.append('captcha', img_code)
  _formData.append('uuid', Storage.getItem('uuid'))
  return request({
    url: `passport/login/smscode/${mobile}`,
    method: 'post',
    data: _formData
  })
}

/**
 * 用户名重复校验
 * @param username
 */
export function checkUsernameRepeat(username) {
  return request({
    url: `passport/username/${username}`,
    method: 'get',
    loading: false
  })
}

/**
 * 手机号重复校验
 * @param mobile
 */
export function checkMobileRepeat(mobile) {
  return request({
    url: `passport/mobile/${mobile}`,
    method: 'get',
    loading: false
  })
}

/**
 * 注册会员【手机号】
 * @param params
 */
export function registerByMobile(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: 'passport/register/pc',
    method: 'post',
    data: _formData
  })
}
