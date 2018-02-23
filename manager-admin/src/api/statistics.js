/**
 * 统计相关API
 */

import request from '@/utils/request'

/** 会员分析 */

/**
 * 会员下单量
 * @param params
 * @returns {Promise<any>}
 */
export function memberOrderNum(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-order-num-top.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 新增会员统计
 * @param params
 * @returns {Promise<any>}
 */
export function addMemberStatistics(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-add-member-num.do',
      method: 'get',
      loaidng: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
