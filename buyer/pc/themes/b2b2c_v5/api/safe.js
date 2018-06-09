/**
 * 安全相关API
 */

import request from '@/utils/request'

/**
 * 校验短信验证码
 * @param type 验证类型
 * @param mobile 手机号
 * @param mobile_code 手机验证码
 * @param img_code 图片验证码
 * @returns {AxiosPromise}
 */
export function validMobileSms(type, mobile, mobile_code, img_code) {
  return request({
    url: `${process.env.VALIDATE_CODE_API}/api/shop/member/member-mobile-validate.do`,
    method: 'get',
    needToken: true,
    params: {
      validcode: img_code,
      mobileCode: mobile_code,
      mobile,
      key: type
    }
  })
}

/**
 * 修改密码
 * @param new_password 新密码
 * @param rep_password 确认新密码
 * @param img_code 图片验证码
 * @returns {AxiosPromise}
 */
export function changePassword(new_password, rep_password, img_code) {
  const _formData = new FormData()
  _formData.append('newpassword', new_password)
  _formData.append('re_passwd', rep_password)
  _formData.append('authCode', img_code)
  return request({
    url: `${process.env.VALIDATE_CODE_API}/api/shop/member/update-password.do`,
    method: 'post',
    needToken: true,
    data: _formData
  })
}

/**
 * 发送更换密码的手机验证码
 * @param mobile
 * @param params
 */
export function sendUpdatePasswordMobileCode(mobile, params) {
  return request({
    url: 'members/security/send-val-code',
    method: 'post',
    needToken: true,
    data: params
  })
}

/**
 * 修改密码
 * @param params
 */
export function updatePassword(params) {
  return request({
    url: 'members/security/update-password',
    method: 'post',
    needToken: true,
    data: params
  })
}

/////////////////////////////////////////////////////////////////////////////////////
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
