const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  BASE_API: `"${domain.pro.seller}"`, // api接口地址
  BASE_IMG_URL: `"${domain.pro.base}/uploaders"` // 图片服务器地址
}
