/**
 * 店铺相关API
 */

import request from '@/utils/request'

/**
 * 获取店铺数据
 * @param shop_id 店铺ID
 * @returns {AxiosPromise}
 */
export function getShopData(shop_id) {
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/shop/${shop_id}`,
    method: 'get'
  })
}

/**
 * 获取店铺商品列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getShopGoods(params) {
  if(!params.page_size) params.page_size = 16
  return request({
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/shop/goods-list',
    method: 'get',
    params
  })
}

/**
 * 会员初始化店铺信息
 */
export function initApplyShop() {
  return request({
    url: 'shops',
    method: 'post'
  })
}

/**
 * 获取店铺信息
 */
export function getApplyShopInfo() {
  return request({
    url: 'shops',
    method: 'get'
  })
}

/**
 * 会员申请开店步骤
 * @param step
 * @param params
 */
export function applyShopStep(step, params) {
  return request({
    url: `shops/step${step}`,
    method: 'put',
    data: params
  })
}
