const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	SELLER_API: `"${domain.api_dev.seller}"` // api接口地址
}
