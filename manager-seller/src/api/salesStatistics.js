/**
 * 销售统计相关API
 */

import request from '@/utils/request'

/**
 * 获取销售统计信息列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSalesStatisticsNum(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/reports/sales_num',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 获取销售统计下单金额
 * @param params
 * @returns {Promise<any>}
 */
export function getSalesStatisticsMoney(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/reports/sales_money',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

/**
 * 获取销售统计表格数据
 * @param params
 * @returns {Promise<any>}
 */
export function getSalesStatisticsGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/reports/sales_page',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

