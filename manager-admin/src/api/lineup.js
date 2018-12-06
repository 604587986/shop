/**
 * 排队管理API
 */

import request from '@/utils/request'

/**
 * 获取商品列表
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