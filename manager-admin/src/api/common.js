/**
 * 公共API
 */

import { api } from '~/ui-domain'
import request from '@/utils/request'

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
export const regionApi = process.env.ADMIN_API + '/systems/regions/@id/children'

/**
 * 获取首页数据
 */
export function getIndexData() {
  return request({
    url: 'index/page',
    method: 'get',
    loading: false
  })
}
