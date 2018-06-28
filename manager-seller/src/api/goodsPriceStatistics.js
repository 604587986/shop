import request from '@/utils/request'

/**
 * 获取价格销量统计列表
 * @param params
 * @returns {Promise<any>}
 */
export function getPriceStatisticsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/goods/price_sales',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}
