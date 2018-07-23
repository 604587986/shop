const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	SELLER_API: `"${domain.api_dev.seller}"`, // api接口地址
  BASE_API: `"${domain.api_dev.base}"` // baseapi接口地址
}
