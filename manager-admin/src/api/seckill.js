import request from '@/utils/request'
import SeckillModel from '@/models/SeckillModel'
import SeckillGoodsModel from '@/models/SeckillGoodsModel'

/**
 * 获取限时抢购列表
 * @param params
 * @returns {Promise<any>}
 */
export function getSeckillList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shop/admin/seckill.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SeckillModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存限时抢购
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function saveSeckill(id, params) {
  const _params = {
    apply_end_time_str: params.apply_end_time,
    range_list: params.range_list,
    seckill_name: params.seckill_name,
    seckill_rule: params.seckill_rule,
    start_day_str: params.start_day
  }
  return new Promise((resolve, reject) => {
    request({
      url: id ? `shop/admin/seckill/${id}.do` : 'shop/admin/seckill.do',
      method: 'post',
      data: _params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 发布限时抢购
 * @param id
 * @param params
 */
export function publishSeckill(id, params) {
  const _params = {
    apply_end_time_str: params.apply_end_time,
    range_list: params.range_list,
    seckill_name: params.seckill_name,
    seckill_rule: params.seckill_rule,
    start_day_str: params.start_day
  }
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/seckill/${id}/release.do`,
      method: 'post',
      data: _params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取限时抢购待审核商品列表
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getAuditGoodsList(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/seckill/${id}/goods.do?status=APPLY`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SeckillGoodsModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 通过限时抢购审核通过
 * @param id
 * @returns {Promise<any>}
 */
export function passSeckillAuditGoods(id) {
  const _params = {
    status: 'PASS',
    fail_reason: ''
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/seckill/${id}/auth.do`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 限时抢购商品驳回
 * @param id
 * @param reason
 * @returns {Promise<any>}
 */
export function rejectSeckillAuditGoods(id, reason) {
  const _params = {
    status: 'FAIL',
    fail_reason: reason
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/seckill/${id}/auth.do`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取已通过审核的限时抢购商品列表
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function getPassGoodsList(id, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `shop/admin/seckill/${id}/goods.do?status=PASS`,
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SeckillGoodsModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
