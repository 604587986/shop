/**
 * Created by Andste on 2018/7/2.
 * 信任登录相关API
 */

import request from '@/utils/request'
import { api } from '~/ui-domain'

/**
 * 获取第三方登录url
 * @param client_type
 * @param login_type
 * @returns {string}
 */
export function getConnectUrl(client_type, login_type) {
  return `${api.passport}/connect/${client_type}/${login_type}`
}
