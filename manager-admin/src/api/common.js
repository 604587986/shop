/**
 * 公共API
 */

import { api } from '~/ui-domain'

/**
 * 获取图片验证码URL
 * @param scene
 * @param uuid
 * @returns {string}
 */
export function getValidateCodeUrl(scene, uuid) {
  return `${api.base}/captchas/${uuid}/${scene}?rmd=${new Date().getTime()}`
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
