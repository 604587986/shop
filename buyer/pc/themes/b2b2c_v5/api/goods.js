/**
 * 商品相关API
 */

import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/list',
      method: 'get',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
