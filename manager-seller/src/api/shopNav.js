/**
 * 店铺导航相关API
 */

import request from '@/utils/request'
import ShopNavModel from '@/models/ShopNavModel'

/**
 * 获取店铺导航列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopNavList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/navigations',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopNavModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加店铺导航
 * @param params
 * @returns {Promise<any>}
 */
export function addShopNav(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/navigations',
      method: 'post',
      params
      // data: params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 修改店铺导航
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editShopNav(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/navigations/${id}`,
      method: 'put',
      params
      // data: params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除店铺导航
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function delShopNav(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/navigations/${id}`,
      method: 'delete',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
