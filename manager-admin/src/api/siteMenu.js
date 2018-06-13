/**
 * 导航栏相关API
 */

import request from '@/utils/request'

/**
 * 获取导航栏 - PC
 * @param params
 */
export function getSiteMenuByPC(params) {
  return getSiteMenu(params, 'PC')
}

/**
 * 获取导航栏 - Mobile
 * @param params
 */
export function getSiteMenuByMobile(params) {
  return getSiteMenu(params, 'MOBILE')
}

/**
 * 获取导航栏
 * @param params
 * @param type
 * @returns {Promise<any>}
 */
function getSiteMenu(params, type) {
  return request({
    url: 'core/admin/site-menu.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加导航菜单 - PC
 * @param params
 */
export function addPCSiteMenu(params) {
  return request({
    url: 'core/admin/site-menu.do',
    method: 'post',
    data: params
  })
}

/**
 * 编辑导航菜单 - PC
 * @param id
 * @param params
 */
export function editPCSiteMenu(id, params) {
  return request({
    url: `core/admin/site-menu/${id}.do`,
    method: 'post',
    data: params
  })
}

/**
 * 删除导航菜单 - PC
 * @param id
 */
export function deletePCSiteMenu(id) {
  return request({
    url: `core/admin/site-menu/${id}.do`,
    method: 'delete'
  })
}

/**
 * 添加导航菜单 - Mobile
 * @param params
 */
export function addMobileSiteMenu(params) {
  return request({
    url: 'core/admin/site-menu.do',
    method: 'post',
    data: params
  })
}

/**
 * 编辑导航菜单 - Mobile
 * @param id
 * @param params
 */
export function editMobileSiteMenu(id, params) {
  return request({
    url: `core/admin/site-menu/${id}.do`,
    method: 'post',
    data: params
  })
}

/**
 * 删除导航菜单 - Mobile
 * @param id
 */
export function deleteMobileSiteMenu(id) {
  return request({
    url: `core/admin/site-menu/${id}.do`,
    method: 'delete'
  })
}
