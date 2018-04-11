/**
 * 安全相关API
 */

import request from '@/utils/request'

/**
 * 发送手机验证码
 * @param type
 * @param mobile
 * @param validcode
 * @returns {Promise<any>}
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
 * @param type
 * @param mobile
 * @param mobile_code
 * @param img_code
 * @returns {Promise<any>}
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
 * @param new_password
 * @param rep_passwd
 * @param img_code
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
 * @param mobile
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
