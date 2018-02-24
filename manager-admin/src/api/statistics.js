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
 * 会员订单商品量
 * @param params
 * @returns {Promise<any>}
 */
export function memberGoodsNum(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-goods-num-top.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 会员订单金额
 * @param params
 * @returns {Promise<any>}
 */
export function memberPriceNum(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/memberStatistics/get-order-price-top.do',
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
      loading: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/** 商品统计 */

/**
 * 价格销量
 * @param params
 * @returns {Promise<any>}
 */
export function getPriceSales(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  _formData.append('store_id', params.shop_id)
  _formData.append('cycle_type', params.type)
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/goodsStatis/get-price-sales-json.do',
      method: 'post',
      loading: false,
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
