import request from '@/utils/request'
import PointGoodsModel from '@/models/PointGoodsModel'

/**
 * 获取积分商品列表
 * @param params
 * @returns {Promise<any>}
 */
export function getPointGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/exchange-goods.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new PointGoodsModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
