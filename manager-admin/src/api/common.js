/**
 * 公共API
 */

const domain = require('../../ui-domain')
const envPro = process.env.NODE_ENV === 'production'
const baseApi = envPro ? domain.pro.base : domain.dev.base

/**
 * 获取图片验证码URL
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(type) {
  // return `${process.env.ADMIN_API}/validcode.do?vtype=${type}&rmd=${new Date().getTime()}`
  return `http://localhost:9090/javashop/validcode.do?vtype=${type}&rmd=${new Date().getTime()}`
}

/**
 * 图片上传API
 * @type {string}
 */
export const uploadApi = baseApi + '/uploaders'

/**
 * 地区选择API
 * @type {string}
 */
export const regionApi = baseApi + '/regions/@id/children'
