/**
 * 地区管理相关API
 */

import request from '@/utils/request'

export const Api = 'http://localhost:9090/javashop/shop/admin/region/list-children.do?parentid=@id'

/**
 * 添加地区
 * @param params
 */
export function addRegion(params) {
  return request({
    url: 'http://localhost:9090/javashop/shop/admin/region/save-add-children.do',
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
    url: 'http://localhost:9090/javashop/shop/admin/region/save-edit.do',
    method: 'post',
    data: params
  })
}

/**
 * 删除地区
 * @param id
 */
export function deleteRegion(id) {
  return request({
    url: 'http://localhost:9090/javashop/shop/admin/region/delete.do',
    method: 'post',
    data: { region_id: id }
  })
}

