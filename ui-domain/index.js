const api    = require('./api')
const domain = require('./domain')

const isDev = process.env.NODE_ENV === 'development'

module.exports =  {
  // 开发环境下的API
  api_dev: api.dev,
  // 生产环境下的API
  api_pro: api.pro,
  // 开发环境下的域名
  domain_dev: domain.dev,
  // 生产环境下的域名
  domain_pro: domain.pro,
  // API环境自动适配
  api: isDev ? api.dev : api.pro,
  // 域名环境自动适配
  domain: isDev ? domain.dev : domain.pro
}
