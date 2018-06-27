/**
 * 热卖商品相关API
 */

import request from '@/utils/request'

/**
 * 热卖商品分析信息
 * @param params
 * @returns {Promise<any>}
 */
export function getHotGoodsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/hot/goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    })
  })
}

