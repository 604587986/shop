/**
 * Created by Andste on 2018/4/28.
 * 发送手机验证码相关接口集合
 */

import request from '@/utils/request'
import uuid from 'uuid/v1'

/**
 * 发送会员注册手机验证码
 * @param uuid
 * @param mobile
 * @param img_code
 */
export function register(uuid, mobile, img_code) {
  const _formData = new FormData()
  _formData.append('captcha', img_code)
  _formData.append('uuid', uuid)
  return request({
    url: `http://192.168.2.5:8084/passport/register/smscode/${mobile}`,
    method: 'post',
    data: _formData
  })
}
