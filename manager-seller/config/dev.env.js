const { api_dev } = require('../ui-domain')
module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	SELLER_API: `"${api_dev.seller}"`, // api接口地址
  BASE_API: `"${api_dev.base}"`, // baseapi接口地址
  BASE_IMG_URL: `"${api_dev.base}/uploaders"` // 图片服务器地址
}
