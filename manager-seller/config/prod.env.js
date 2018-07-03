const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  SELLER_API: `"${domain.api_pro.seller}"`, // api接口地址
  BASE_API: `"${domain.api_pro.base}"`, // baseapi接口地址
  BASE_IMG_URL: `"${domain.api_pro.base}/uploaders"`, // 图片服务器地址
  HTTP_URL: `"${domain.domain.buyer_pc}"`
}
