/**
 * 公共API
 */

import { api } from '~/ui-domain'

/**
 * 获取图片验证码URL
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(type) {
  return `${api.base}/validcode.do?vtype=${type}&rmd=${new Date().getTime()}`
}

/**
 * 图片上传API
 * @type {string}
 */
export const uploadApi = api.base + '/uploaders'

/**
 * 地区选择API
 * @type {string}
 */
export const regionApi = api.base + '/regions/@id/children'
