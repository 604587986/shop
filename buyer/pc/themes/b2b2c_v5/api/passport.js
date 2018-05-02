/**
 * Created by Andste on 2018/5/2.
 * 用户认证相关API
 */

import request from '@/utils/request'
import uuid from 'uuid/v1'

/**
 * 普通登录
 * @param params
 */
export function login(params) {
  return request({
    url: 'http://192.168.2.5:7001/passport/login',
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
    url: 'http://192.168.2.5:7001/passport/login/${mobile}',
    method: 'get',
    params: { sms_code }
  })
}

/**
 * 发送会员注册手机验证码
 * @param uuid
 * @param mobile
 * @param img_code
 */
export function sendRegisterSms(uuid, mobile, img_code) {
  const _formData = new FormData()
  _formData.append('captcha', img_code)
  _formData.append('uuid', uuid)
  return request({
    url: `http://192.168.2.5:7001/passport/register/smscode/${mobile}`,
    method: 'post',
    data: _formData
  })
}

/**
 * 发送会员登录手机验证码
 * @param uuid
 * @param mobile
 * @param img_code
 */
export function sendLoginSms(uuid, mobile, img_code) {
  const _formData = new FormData()
  _formData.append('captcha', img_code)
  _formData.append('uuid', uuid)
  return request({
    url: `http://192.168.2.5:7001/passport/login/smscode/${mobile}`,
    method: 'post',
    data: _formData
  })
}

/**
 *
 * @param username
 */
export function checkUsernameRepeat(username) {
  return request({
    url: `http://192.168.2.5:7001/passport/username/${username}`,
    method: 'get'
  })
}

/**
 * 手机号重复校验
 * @param mobile
 */
export function checkMobileRepeat(mobile) {
  return request({
    url: `http://192.168.2.5:7001/passport/mobile/${mobile}`,
    method: 'get'
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
    url: `http://192.168.2.5:7001/passport/register/pc`,
    method: 'post',
    data: _formData
  })
}
