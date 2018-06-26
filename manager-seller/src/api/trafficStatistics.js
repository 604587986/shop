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
      url: '/statistics/page_view/shop',
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
      url: '/statistics/page_view/goods',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

