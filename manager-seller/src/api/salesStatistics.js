/**
 * 销售统计相关API
 */

import request from '@/utils/request'

/**
 * 获取销售统计信息列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSalesStatisticsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/sales/statistics/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}
