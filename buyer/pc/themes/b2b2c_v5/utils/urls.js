/**
 * Created by andste.cc@gmail.com on 2018/5/4.
 * 获取不同服务下的正确的URL。
 * dev_domain 开发模式下的域名
 * pro_domain 生产模式下的域名
 * domain.base 基础服务
 * domain.passport 认证服务
 * domain.main 业务逻辑服务
 */

/**
 * 开发模式域名
 * @type {{base : string, passport : string, main : string}}
 */
const dev_domain = {
  base: 'http://192.168.2.5:7000/',
  passport: 'http://192.168.2.5:7001/',
  main: 'http://192.168.2.5:7002/'
}

/**
 * 生产模式域名
 * @type {{base : string, passport : string, main : string}}
 */
const pro_domain = {
  base: 'http://192.168.2.5:7000/',
  passport: 'http://192.168.2.5:7001/',
  main: 'http://192.168.2.5:7002/'
}

/**
 * 返回完整URL
 * @param url
 * @returns {*}
 */
export default function getFullUrl(url) {
  const _domain = process.env.NODE_ENV === 'production'
    ? pro_domain
    : dev_domain
  let _url = _domain + url
  if (/^\/?passport($|\/)/.test(url)) _url = _domain.passport + url
  if (/^\/?captchas($|\/)|^\/?uploaders($|\/)/.test(url)) _url =  _domain.base + url
  return _url.replace(/([^:])\/\//g, '$1/')
}
