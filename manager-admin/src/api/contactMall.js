/**
 * 商城联系方式相关API
 */

import request from '@/utils/request'
import ContactMallModel from '@/models/ContactMallModel'

/**
 * 获取商城联系方式列表
 * @param params
 * @returns {Promise<any>}
 */
export function getContactMallList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/data/list-json.do?catid=28',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ContactMallModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
