/**
 * Created by andste.cc@gmail.com on 2018/6/28.
 * 信任登录相关API
 */

import request from '@/utils/request'

/**
 * 获取信任登录参数
 */
export function getConnect() {
  return request({
    url: 'members/connect',
    method: 'get'
  })
}

/**
 * 修改信任登录参数
 * @param params
 */
export function editConnect(params) {
  return request({
    url: 'members/connect',
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}
