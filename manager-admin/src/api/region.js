/**
 * 地区管理相关API
 */

import request from '@/utils/request'

export const Api = 'http://yiqisi.s1.natapp.cc/base-api/regions/@id'

/**
 * 添加地区
 * @param params
 */
export function addRegion(params) {
  return request({
    url: 'regions',
    method: 'post',
    data: params
  })
}

/**
 * 编辑地区
 * @param id
 * @param params
 */
export function editRegion(id, params) {
  return request({
    url: `regions/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除地区
 * @param id
 */
export function deleteRegion(id) {
  return request({
    url: `regions/${id}`,
    method: 'delete'
  })
}

