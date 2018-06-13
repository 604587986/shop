/**
 * 商城联系方式相关API
 */

import request from '@/utils/request'

/**
 * 获取商城联系方式列表
 * @param params
 */
export function getContactMallList(params) {
  return request({
    url: 'cms/admin/data/list-json.do?catid=28',
    method: 'get',
    loading: false,
    params
  })
}
