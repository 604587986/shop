/**
 * 商品管理API
 */

import request from '@/utils/request'
import GoodsModel from '@/models/GoodsModel'

/**
 * 获取商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/goods/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 下架商品
 * @param params
 * @returns {Promise<any>}
 */
export function underGoods(params) {
  const _params = {
    goodsId: params.goods_id,
    message: params.message
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/goods/under.do`,
      method: 'post',
      data: _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
