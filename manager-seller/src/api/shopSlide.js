/**
 * 店铺幻灯片相关API
 */

import request from '@/utils/request'
import ShopSlideModel from '@/models/ShopSlideModel'

/**
 * 获取店铺幻灯片列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopSlideList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/sildes',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopSlideModel().map(response)
      resolve(_response)
    })
  })
}

/**
 * 保存店铺幻灯片列表（更新/添加操作）
 * @param params
 * @returns {Promise<any>}
 */
export function saveShopSlide(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/sildes',
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: params
    }).then(response => resolve(response))
  })
}

/**
 * 删除幻灯片
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function delShopSlide(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/sildes/${ids}`,
      method: 'delete',
      params
    }).then(response => resolve(response))
  })
}
