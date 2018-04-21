/**
 * 商品相关API
 */

import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getGoodsList(params) {
  return request({
    url: 'goods/list',
    method: 'get',
    params
  })
}
