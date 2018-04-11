import request from '@/utils/request'
import GoodsDetailsStatisticsModel from '@/models/GoodsDetailsStatisticsModel'

/**
 * 获取商品详情统计列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsStatisticsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/goods/details/statistics',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new GoodsDetailsStatisticsModel().map(_response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
