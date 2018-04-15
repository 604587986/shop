/**
 * 区域分析API
 */

import request from '@/utils/request'

/**
 * 区域分析列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRegionalAnalysisList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/regional/analysis/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
