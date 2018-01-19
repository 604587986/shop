import request from '@/utils/request'

/**
 * 获取图片验证码URL
 * @param type
 * @returns {string}
 */
export function getValidateCodeUrl(type) {
  return `validcode.do?vtype=${type}&rmd=${new Date().getTime()}`
}
