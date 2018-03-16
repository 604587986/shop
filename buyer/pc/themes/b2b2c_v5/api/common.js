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
  return `${process.env.BASE_API}/validcode.do?vtype=${type}&rmd=${new Date().getTime()}`
}

/**
 * 图片上传API
 * @type {string}
 */
export function getUploadApi() {
  return `${process.env.UPLOAD_API}/core/upload.do`
}