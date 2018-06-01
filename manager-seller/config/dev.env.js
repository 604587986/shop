const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	BASE_API: `"${domain.dev.seller}"`, // api接口地址
  BASE_REGION: `"${domain.dev.base}"`, // baseapi接口地址
  BASE_IMG_URL: `"${domain.dev.base}/uploaders"` // 图片服务器地址
}
