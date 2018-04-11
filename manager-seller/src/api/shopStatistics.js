/**
 * 店铺概况相关API
 */

import request from '@/utils/request'

/**
 * 获取店铺概况
 * @param params
 * @returns {Promise<any>}
 */
export function getShopSurvey() {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/shop/Statistics',
      method: 'get',
      loading: false
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
