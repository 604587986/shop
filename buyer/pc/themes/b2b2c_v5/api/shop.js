/**
 * 店铺相关API
 */

import request, { Method } from '@/utils/request'

/**
 * 获取店铺数据
 * @param shop_id 店铺ID
 * @returns {AxiosPromise}
 */
export function getShopData(shop_id) {
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/shop/${shop_id}`,
    method: Method.GET
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
    method: Method.GET,
    params
  })
}

/**
 * 会员初始化店铺信息
 */
export function initApplyShop() {
  return request({
    url: 'shops/apply',
    method: Method.POST
  })
}

/**
 * 获取店铺信息
 */
export function getApplyShopInfo() {
  return request({
    url: 'shops/apply',
    method: Method.GET
  })
}

/**
 * 会员申请开店步骤
 * @param step
 * @param params
 */
export function applyShopStep(step, params) {
  return request({
    url: `shops/apply/step${step}`,
    method: Method.PUT,
    data: params
  })
}

/**
 * 获取店铺基本信息
 * @param shop_id
 */
export function getShopBaseInfo(shop_id) {
  return request({
    url: `shops/${shop_id}`,
    method: Method.GET,
    loading: false
  })
}
