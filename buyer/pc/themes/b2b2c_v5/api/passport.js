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
 * @param captcha
 */
export function sendRegisterSms(mobile, captcha) {
  return request({
    url: `passport/register/smscode/${mobile}`,
    method: 'post',
    data: {
      captcha,
      uuid: Storage.getItem('uuid')
    }
  })
}

/**
 * 发送会员登录手机验证码
 * @param mobile
 * @param captcha
 */
export function sendLoginSms(mobile, captcha) {
  return request({
    url: `passport/login/smscode/${mobile}`,
    method: 'post',
    data: {
      captcha,
      uuid: Storage.getItem('uuid')
    }
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
  return request({
    url: 'passport/register/pc',
    method: 'post',
    data: params
  })
}

/**
 * 验证手机验证码
 * @param mobile   手机号码
 * @param scene    业务场景
 * @param sms_code 短信验证码
 */
export function validMobileSms(mobile, scene, sms_code) {
  return request({
    url: `passport/smscode/${mobile}`,
    method: 'get',
    params: {
      scene,
      sms_code
    }
  })
}

/**
 * 验证账户信息
 * @param uuid
 * @param captcha
 * @param account
 */
export function validAccount(uuid, captcha, account) {
  return request({
    url: 'passport/find-pwd',
    method: 'get',
    params: {
      uuid,
      captcha,
      account
    }
  })
}

/**
 * 发送找回密码短信
 * @param uuid
 * @param captcha
 */
export function sendFindPasswordSms(uuid, captcha) {
  return request({
    url: 'passport/find-pwd/send',
    method: 'post',
    data: {
      uuid,
      captcha
    }
  })
}

/**
 * 校验找回密码验证码
 * @param uuid
 * @param sms_code
 */
export function validFindPasswordSms(uuid, sms_code) {
  return request({
    url: 'passport/find-pwd/valid',
    method: 'get',
    params: {
      uuid,
      sms_code
    }
  })
}

/**
 * 修改密码【找回密码用】
 * @param uuid
 * @param password
 */
export function changePassword(uuid, password) {
  return request({
    url: 'passport/find-pwd/update-password',
    method: 'put',
    data: {
      uuid,
      password
    }
  })
}
