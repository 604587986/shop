/**
 * 安全相关API
 */

import request from '@/utils/request'

/**
 * 发送绑定手机验证码
 * @param mobile
 * @param captcha
 * @param uuid
 */
export function sendBindMobileSms(mobile, captcha, uuid) {
  return request({
    url: `members/security/bind/send/${mobile}`,
    method: 'post',
    needToken: true,
    data: {
      uuid,
      captcha
    }
  })
}

/**
 * 绑定手机号
 * @param mobile
 * @param sms_code
 */
export function bindMobile(mobile, sms_code) {
  return request({
    url: `members/security/bind/${mobile}`,
    method: 'put',
    needToken: true,
    data: { sms_code }
  })
}

/**
 * 发送手机验证码
 * 在修改手机号和更改密码时通用
 * @param uuid
 * @param captcha
 */
export function sendMobileSms(uuid, captcha) {
  return request({
    url: 'members/security/send',
    method: 'post',
    data: {
      uuid,
      captcha
    }
  })
}

/**
 * 验证更换手机号短信
 * @param sms_code
 */
export function validChangeMobileSms(sms_code) {
  return request({
    url: 'members/security/exchange-bind',
    method: 'get',
    params: { sms_code }
  })
}

/**
 * 更换手机号
 * @param mobile
 * @param sms_code
 */
export function changeMobile(mobile, sms_code) {
  return request({
    url: `members/security/exchange-bind/${mobile}`,
    method: 'put',
    data: { sms_code }
  })
}

/**
 * 验证更改密码手机短信
 * @param sms_code
 */
export function validChangePasswordSms(sms_code) {
  return request({
    url: 'members/security/password',
    method: 'get',
    params: { sms_code }
  })
}

/**
 * 更改密码
 * @param uuid
 * @param captcha
 * @param password
 */
export function changePassword(uuid, captcha, password) {
  return request({
    url: 'members/security/password',
    method: 'put',
    data: {
      uuid,
      captcha,
      password
    }
  })
}
