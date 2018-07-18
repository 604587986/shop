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
 * 获取首页数据
 */
export function getIndexData() {
  return request({
    url: 'index/page',
    method: 'get',
    loading: false
  })
}
