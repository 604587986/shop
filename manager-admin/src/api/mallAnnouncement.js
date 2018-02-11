/**
 * 商城公告相关API
 */

import request from '@/utils/request'
import MallAnnouncementModel from '@/models/MallAnnouncementModel'

/**
 * 获取商城公告列表
 * @param params
 * @returns {Promise<any>}
 */
export function getMallAnnounList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'cms/admin/data/list-json.do?catid=26',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new MallAnnouncementModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
