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
  return `${api.base}/captchas/${uuid}/${type}?r=${new Date().getTime()}`
}

/**
 * 图片上传API
 * @type {string}
 */
export const uploadApi = `${api.base}/uploaders`

/**
 * 地区API
 * @type {string}
 */
export const regionApi = `${api.base}/regions/@id/children`
