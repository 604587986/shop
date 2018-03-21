/**
 * 物流公司相关API
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
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/logistics/company/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ExpressCompanyModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 开启/关闭 物流公司
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function switchExpressPower(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/logistics/company/${ids}`,
      method: 'post',
      loading: false,
      _formData
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
