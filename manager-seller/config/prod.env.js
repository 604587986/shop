const { api_pro } = require('../ui-domain')
module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  SELLER_API: `"${api_pro.seller}"`, // api接口地址
  BASE_API: `"${api_pro.base}"`, // baseapi接口地址
  BASE_IMG_URL: `"${api_pro.base}/uploaders"` // 图片服务器地址
}
