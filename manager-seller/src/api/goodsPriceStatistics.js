import request from '@/utils/request'

/**
 * 获取价格销量统计列表
 * @param params
 * @returns {Promise<any>}
 */
export function getPriceStatisticsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/price/statistics/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
