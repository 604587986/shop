import request from '@/utils/request'

/**
 * 获取商品详情统计列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsStatisticsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/statistics/goods/goods_detail',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}
