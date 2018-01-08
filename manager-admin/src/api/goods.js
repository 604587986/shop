/**
 * 商品管理API
 */
import request from '@/utils/request'

import GoodsListModel from '../models/GoodsListModel'

/** 获取商品列表 */
export function getGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsListModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/** 下架商品 */
export function underGoods(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return new Promise((resolve, reject) => {
    request({
      url: `goods/${ids}`,
      method: 'delete'
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
