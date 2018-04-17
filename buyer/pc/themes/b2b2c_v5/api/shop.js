/**
 * 店铺相关API
 */

import request from '@/utils/request'

/**
 * 获取店铺数据
 * @param shop_id
 * @returns {AxiosPromise}
 */
export function getShopData(shop_id) {
  return request({
    url: `shop/${shop_id}`,
    method: 'get'
  })
}
