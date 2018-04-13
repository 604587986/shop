/**
 * 储存方案相关API
 */

import request from '@/utils/request'
import StorageSolutionModel from '@/models/StorageSolutionModel'

/**
 * 获取储存方案列表
 * @param params
 * @returns {Promise<any>}
 */
export function getStorageSolutionList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/system/uploaders',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      // _response.data = new StorageSolutionModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 开启储存方案
 * @param id
 * @returns {Promise<any>}
 */
export function openStorageSolutionById(id) {
  const _formData = new FormData()
  _formData.append(id, null)
  return new Promise((resolve, reject) => {
    request({
      url: 'shop-core/admin/uploader/set-open.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
