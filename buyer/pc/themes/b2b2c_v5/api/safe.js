/**
 * 安全相关API
 */

import request from '@/utils/request'

/**
 * 发送手机验证码
 * @param type 验证类型
 * @param mobile 手机号
 * @param validcode 图片验证码
 * @returns {AxiosPromise}
 */
export function sendMobileSms(type, mobile, validcode) {
  return request({
    url: `${process.env.VALIDATE_CODE_API}/api/shop/member/send-sms-code.do`,
    method: 'get',
    params: {
      validcode,
      mobile,
      key: type,
      _: new Date().getTime()
    }
  })
}

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
    data: _formData
  })
}

/**
 * 绑定手机号
 * @param mobile 手机号
 * @returns {AxiosPromise}
 */
export function bindMobile(mobile) {
  const _formData = new FormData()
  _formData.append('mobile', mobile)
  return request({
    url: '',
    method: 'post',
    data: _formData
  })
}

