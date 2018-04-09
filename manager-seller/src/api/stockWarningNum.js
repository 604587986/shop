/**
 * 库存预警设置相关API
 */

import request from '@/utils/request'
import StockWarningNumModel from '@/models/StockWarningNumModel'

/**
 * 获取库存预警数量
 * @param params
 * @returns {Promise<any>}
 */
export function getStockWarningNum(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/settings/stock-number',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存库存预警数量
 * @param params
 * @returns {Promise<any>}
 */
export function saveStockWarningNum(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/settings/reserve/stock-number',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
