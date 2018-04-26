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
    url: `shop/${shop_id}`,
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
    url: 'shop/goods-list',
    method: 'get',
    params
  })
}
