/**
 * 公共API
 */

import request, { Method } from '@/utils/request'
import Storage from '@/utils/storage'
import { api, api_dev } from '~/ui-domain'

const urlPrefix = process.server ? (api_dev.base + '/') : ''

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
    url: `${urlPrefix}site-show`,
    method: Method.GET
  })
}
