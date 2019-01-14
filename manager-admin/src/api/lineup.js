/**
 * 排队管理API
 */

import request from '@/utils/request'

/**
 * 获取补贴商品列表
 * @param params
 */
export function getGoodsList(params) {
  return request({
    url: 'admin/lineup/bangdanlist',
    method: 'get',
    loading: false,
    params
  })
}
/**
 * 获取排队列表
 * @param params
 */
export function getLineupList(params) {
  return request({
    url: 'admin/lineup/list',
    method: 'get',
    loading: false,
    params
  })
}
/**
 * 获取个人帮派列表
 * @param params
 */
export function getMemberList(params) {
  return request({
    url: 'admin/lineup/gangs',
    method: 'get',
    loading: false,
    params
  })
}
