/**
 * 公共API
 */

import request, { Method } from '@/utils/request'
import Storage from '@/utils/storage'
import { api } from '~/ui-domain'

/**
 * 获取图片验证码URL
 * @param uuid
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(uuid, type) {
  if (!uuid || !type) return ''
  return `${api.base}/captchas/${uuid}/${type}?r=${new Date().getTime()}`
}

/**
 * 获取站点设置
 */
export function getSiteData() {
  return request({
    url: `${api.base}/site-show`,
    method: Method.GET
  })
}

/**
 * 记录浏览量【用于统计】
 */
export function recordViews(url) {
  return request({
    url: 'view',
    method: Method.GET,
    params: {
      url,
      uuid: Storage.getItem('uuid')
    }
  })
}
