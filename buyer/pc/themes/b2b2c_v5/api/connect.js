/**
 * Created by Andste on 2018/7/2.
 * 信任登录相关API
 */

import request, { Method } from '@/utils/request'
import { api } from '~/ui-domain'
import md5 from 'js-md5'

/**
 * 获取第三方登录url
 * @param client_type
 * @param login_type
 * @returns {string}
 */
export function getConnectUrl(client_type, login_type) {
  return `${api.passport}/connect/${client_type}/${login_type}`
}

/**
 * 第三方登录绑定
 * @param uuid
 * @param params
 */
export function loginByConnect(uuid, params) {
  params.password = md5(params.password)
  return request({
    url: `${api.passport}/login-binder/pc/${uuid}`,
    method: Method.PUT,
    data: params
  })
}

/**
 * 登录绑定openid
 * @param uuid
 */
export function loginBindConnect(uuid) {
  return request({
    url: `account-binder/login/${uuid}`,
    method: Method.POST
  })
}

/**
 * 注册绑定openid
 * @param uuid
 */
export function registerBindConnect(uuid) {
  return request({
    url: `account-binder/register/${uuid}`,
    method: Method.POST
  })
}

