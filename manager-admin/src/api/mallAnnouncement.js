/**
 * 商城公告相关API
 */

import request from '@/utils/request'

/**
 * 获取商城公告列表
 * @param params
 */
export function getMallAnnounList(params) {
  return request({
    url: 'cms/admin/data/list-json.do?catid=26',
    method: 'get',
    loading: false,
    params
  })
}
