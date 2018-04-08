/**
 * 公共API
 */

import request from '@/utils/request'

/**
 * 获取图片验证码URL
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(type) {
  return `${process.env.VALIDATE_CODE_API}/validcode.do?vtype=${type}&r=${new Date().getTime()}`
}

/**
 * 图片上传API
 * @type {string}
 */
export function getUploadApi() {
  return `${process.env.UPLOAD_API}/core/upload.do`
}

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
 * @param keyword
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
