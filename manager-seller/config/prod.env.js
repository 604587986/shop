const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  SELLER_API: `"${domain.dev.seller}"`, // api接口地址
  BASE_API: `"${domain.dev.base}"`, // baseapi接口地址
  BASE_IMG_URL: `"${domain.dev.base}/uploaders"` // 图片服务器地址
}
