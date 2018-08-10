/**
 * 公共API
 */

import request, { Method } from '@/utils/request'
import Storage from '@/utils/storage'
import { api, api_dev } from '~/ui-domain'

/**
 * 获取图片验证码URL
 * @param uuid
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(uuid, type) {
  return `${api.base}/captchas/${uuid}/${type}?r=${new Date().getTime()}`
}

/**
 * 获取站点设置
 */
export function getSiteData() {
  return request({
    url: `${api_dev.base}/site-show`,
    method: Method.GET
  })
}
