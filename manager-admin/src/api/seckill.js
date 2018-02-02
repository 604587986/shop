import request from '@/utils/request'
import SeckillModel from '@/models/SeckillModel'

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
