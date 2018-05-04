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
      url: '/shops/logi-companies',
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
 * 开启 物流公司
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function openExpressPower(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/logi-companies/${ids}`,
      method: 'post',
      loading: false,
      data: params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 关闭 物流公司
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function closeExpressPower(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/shops/logi-companies/${ids}`,
      method: 'delete',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
