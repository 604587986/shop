/**
 * 活动相关API
 */

import request from '@/utils/request'
import * as ActivityModel from '@/models/ActivityModel'

/**
 * 获取活动模型列表
 * @param params
 * @returns {Promise<any>}
 */
export function getActivityModelList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/promotions/full/discount/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ActivityModel.Activity().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 删除活动模型
 * @param ids
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function DeleteFullCut(ids, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/promotions/full/discount/${ids}`,
      method: 'delete',
      loading: false,
      data: _formData
    }).then(response => {
      const _response = response
      _response.data = new ActivityModel.Activity().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
