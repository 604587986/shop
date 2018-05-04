/**
 * 公共API
 */

import request from '@/utils/request'
import Storage from '@/utils/storage'
import GetFullUrl from '@/utils/urls'

/**
 * 获取图片验证码URL
 * @param uuid
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(uuid, type) {
  return GetFullUrl(`captchas/${uuid}/${type}?r=${new Date().getTime()}`)
}

/**
 * 图片上传API
 * @type {string}
 */
export const uploadApi = 'http://localhost:3001/javashop/core/upload.do'

/**
 * 获取热门关键字
 * @returns {Promise<any>}
 */
export function getHotKeywords() {
  return new Promise((resolve, reject) => {
    request({
      url: 'hot-keywords',
      method: 'get',
      loading: false
    }).then(response => resolve(response.slice(0, 7))).catch(error => reject(error))
  })
}

/**
 * 搜索关键字自动完成
 * @param keyword 关键词
 * @returns {Promise<any>}
 */
export function getAutoCompleteKeyword(keyword) {
  return new Promise((resolve, reject) => {
    request({
      url: 'auto-complete-keyword',
      method: 'get',
      loading: false,
      message: false,
      params: {
        keyword
      }
    }).then(response => resolve(response.slice(0, 10))).catch(error => reject(error))
  })
}

/**
 * 获取导航栏列表
 * @returns {Promise<any>}
 */
export function getNavList() {
  return new Promise((resolve, reject) => {
    request({
      url: 'nav/list',
      method: 'get',
      loading: false,
      message: false
    }).then(response => resolve(response.slice(0, 8))).catch(error => reject(error))
  })
}

/**
 * 获取分类列表
 * @returns {Promise<any>}
 */
export function getCategoryList() {
  return new Promise((resolve, reject) => {
    request({
      url: 'category/list',
      method: 'get',
      loading: false,
      message: false
    }).then(response => resolve(response.slice(0, 7))).catch(error => reject(error))
  })
}
