/**
 * 流量统计相关API
 */

import request from '@/utils/request'
import TrafficStatisticsModel from '@/models/TrafficStatisticsModel'

/**
 * 店铺总流量
 * @param params
 * @returns {Promise<any>}
 */
export function getShopTraffic(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/traffic/summary/statistics',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 商品流量统计
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsStatistics(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/traffic/goods/statistics',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new TrafficStatisticsModel().map(_response.data)
      resolve(_response)
    })
  })
}

