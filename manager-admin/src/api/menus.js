/**
 * 菜单管理相关API
 */

import request from '@/utils/request'

/**
 * 获取菜单
 * @param parent_id
 */
export function getMenusChildren(parent_id = 0) {
  return request({
    url: `systems/menu`,
    method: 'get',
    params: { parent_id }
  })
}

/**
 * 添加菜单
 * @param params
 */
export function addMenu(params) {
  params.url = 'xxx'
  return request({
    url: 'systems/menu',
    method: 'post',
    data: params
  })
}

/**
 * 修改菜单
 * @param id
 * @param params
 */
export function editMenu(id, params) {
  params.url = 'xxx'
  return request({
    url: `systems/menu/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除菜单
 * @param id
 */
export function deleteMenu(id) {
  return request({
    url: `systems/menu/${id}`,
    method: 'delete'
  })
}
