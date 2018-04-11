/**
 * 收藏统计API
 */

import request from '@/utils/request'
import * as CollectionStatisticsModel from '@/models/CollectionStatisticsModel'

/**
 * 获取收藏列表数据
 * @param params
 * @returns {Promise<any>}
 */
export function getCollectionStatistics(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/collection/statistics/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new CollectionStatisticsModel.CollectionStatistics().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
