/**
 * 快递公司相关API
 */

import request from '@/utils/request'
import ExpressModel from '@/models/ExpressModel'
const expressModel = new ExpressModel()

/**
 * 获取物流公司列表
 * @param params
 * @returns {Promise<any>}
 */
export function getExpressList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shops/logi-companies',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = expressModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加物流公司
 * @param params
 */
export function addExpress(params) {
  return request({
    url: 'shops/logi-companies',
    method: 'post',
    data: expressModel.params(params)
  })
}

/**
 * 删除物流公司
 * @param id
 */
export function deleteExpress(id) {
  return request({
    url: 'shops/logi-companies',
    method: 'delete'
  })
}

/**
 * 获取物流公司详情
 * @param id
 */
export function getExpressDetail(id) {
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
export function editExpress(id, params) {
  return request({
    url: `shops/logi-companies/${id}`,
    method: 'put',
    data: expressModel.params(params)
  })
}
