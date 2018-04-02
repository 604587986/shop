/**
 * 菜单管理相关API
 */

import request from '@/utils/request'

/**
 * 获取菜单
 * @returns {Promise<any>}
 */
export function getMenus() {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/menus',
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 添加菜单
 * @param params
 * @returns {Promise<any>}
 */
export function addMenu(params) {
  const _formData = new FormData()
  _formData.append('parent_id', params.parent_id)
  _formData.append('name', params.name)
  _formData.append('title', params.title)
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/menus',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 修改菜单
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editMenu(id, params) {
  const _formData = new FormData()
  _formData.append('name', params.name)
  _formData.append('title', params.title)
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/menus/${id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除菜单
 * @param id
 * @returns {Promise<any>}
 */
export function deleteMenu(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/menus/${id}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
