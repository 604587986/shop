const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	SELLER_API: `"${domain.api_dev.seller}"`, // api接口地址
  BASE_API: `"${domain.api_dev.base}"`, // baseapi接口地址
  BASE_IMG_URL: `"${domain.api_dev.base}/uploaders"`, // 图片服务器地址
  HTTP_URL: `"${domain.domain_dev.buyer_pc}"`
}
