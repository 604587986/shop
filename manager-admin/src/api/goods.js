import request from '@/utils/request'

import GoodsListModel from '../models/GoodsListModel'

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
