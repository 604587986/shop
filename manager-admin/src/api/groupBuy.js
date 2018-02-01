/**
 * 团购相关API
 */

import request from '@/utils/request'

/**
 * 获取团购活动列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGroupBuyList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-act/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取团购分类列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGroupBuyCategoryList(params) {
  return new  Promise((resolve, reject) => {
    request({
      url: 'shop/admin/group-buy-cat/list-json.do',
      method: 'get',
      loading: false,
      params
    })
  })
}
