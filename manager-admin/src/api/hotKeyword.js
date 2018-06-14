/**
 * 热门关键字相关API
 */

import request from '@/utils/request'

/**
 * 获取热门关键字
 * @param params
 */
export function getHotKeywords(params) {
  return request({
    url: 'cms/admin/data/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}
