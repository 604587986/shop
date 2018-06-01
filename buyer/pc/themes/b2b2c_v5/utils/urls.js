/**
 * Created by andste.cc@gmail.com on 2018/5/4.
 */

const domain = require('../ui-domain')

/**
 * 返回完整URL
 * @param url
 * @returns {*}
 */
export default function getFullUrl(url) {
  const _domain = process.env.NODE_ENV === 'production'
    ? domain.pro
    : domain.dev
  let _url = _domain.buyer + url
  if (/^\/?passport($|\/)/.test(url)) _url = _domain.passport + url
  if (/^\/?captchas($|\/)|^\/?uploaders($|\/)/.test(url)) _url = _domain.base + url
  return _url.replace(/([^:])\/\//g, '$1/')
}
