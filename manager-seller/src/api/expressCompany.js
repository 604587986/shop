/**
 * 快递公司相关API
 */

import request from '@/utils/request'
import ExpressCompanyModel from '@/models/ExpressCompanyModel'

/**
 * 获取物流公司列表
 * @param params
 * @returns {Promise<any>}
 */
export function getExpressCompanyList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/logi/list-logi-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ExpressCompanyModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
