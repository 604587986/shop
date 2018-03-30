/**
 * 活动商品相关API
 */

import request from '@/utils/request'
import * as ActivityGoodsModel from '@/models/ActivityGoodsModel'

/**
 * 获取活动商品模型列表
 * @param params
 * @returns {Promise<any>}
 */
export function getActivityGoddsList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activity/goods/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ActivityGoodsModel.ActivityGoods().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除团购商品
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function delActivityGroupGoods(ids, params) {
  const _formdata = new FormData()
  Object.keys(params).forEach(key => _formdata.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/activity/group/goods/${ids}`,
      method: 'delete',
      loading: false,
      data: _formdata
    }).then(response => {
      resolve(response)
    }).catch(error => reject(error))
  })
}
