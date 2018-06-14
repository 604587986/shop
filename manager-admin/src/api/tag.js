/**
 * 标签管理API
 */

import request from '@/utils/request'

/**
 * 获取标签列表
 * @param params
 */
export function getTags(params) {
  return request({
    url: 'shop/admin/tag/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加标签
 * @param params
 */
export function addTag(params) {
  return request({
    url: 'shop/admin/tag/save-add.do',
    method: 'post',
    data: params
  })
}

/**
 * 删除标签
 * @param id
 * @param params
 */
export function eidtTag(id, params) {
  return request({
    url: 'shop/admin/tag/save-edit.do',
    method: 'post',
    data: params
  })
}

/**
 * 删除标签
 * @param ids
 */
export function deleteTags(ids) {
  return request({
    url: 'shop/admin/tag/delete.do',
    method: 'delete'
  })
}
