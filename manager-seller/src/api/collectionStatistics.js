/**
 * 收藏统计API
 */

import request from '@/utils/request'

/**
 * 获取收藏图表数据
 * @param params
 * @returns {Promise<any>}
 */
export function getCollectionStatistics() {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/collect/chart',
      method: 'get',
      loading: false
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 获取商品列表信息
 * @param params
 * @returns {Promise<any>}
 */
export function getCollectionGoods(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/collect/page',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}
