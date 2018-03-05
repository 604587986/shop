/**
 * 商品索引相关API
 */

import request from '@/utils/request'

/**
 * 生成商品索引
 * @param params
 * @returns {Promise<any>}
 */
export function createGoodsIndex(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/goods-index/create.do',
      method: 'get',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
