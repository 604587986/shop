/**
 * 店铺模板相关API
 */

import request from '@/utils/request'

/**
 * 获取店铺模板列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopThemeList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/themes',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 保存店铺模板
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function saveShopTheme(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/themes/${id}`,
      method: 'put',
      params
    }).then(response => resolve(response))
  })
}

