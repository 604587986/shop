/**
 * 快递公司相关API
 */

import request from '@/utils/request'
import ExpressCompanyModel from '@/models/ExpressCompanyModel'
const expressCompanyModel = new ExpressCompanyModel()

/**
 * 获取物流公司列表
 * @param params
 * @returns {Promise<any>}
 */
export function getExpressCompanyList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shops/logi-companies',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = expressCompanyModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加物流公司
 * @param params
 */
export function addExpressCompany(params) {
  return request({
    url: 'shops/logi-companies',
    method: 'post',
    data: expressCompanyModel.params(params)
  })
}

/**
 * 删除物流公司
 * @param id
 */
export function deleteExpressCompany(id) {
  return request({
    url: 'shops/logi-companies',
    method: 'delete'
  })
}

/**
 * 获取物流公司详情
 * @param id
 */
export function getExpressCompanyDetail(id) {
  return request({
    url: `shops/logi-companies/${id}`,
    method: 'get'
  })
}

/**
 * 修改物流公司
 * @param id
 * @param params
 */
export function editExpressCompany(id, params) {
  return request({
    url: `shops/logi-companies/${id}`,
    method: 'put',
    data: expressCompanyModel.params(params)
  })
}
