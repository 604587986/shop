/**
 * 热门关键字相关API
 */

import request from '@/utils/request'
import HotKeywordModel from '@/models/HotKeywordModel'

/**
 * 获取热门关键字
 * @param params
 * @returns {Promise<any>}
 */
export function getHotKeywords(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/data/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new HotKeywordModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
