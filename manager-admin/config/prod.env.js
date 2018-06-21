const domain = require('../ui-domain')
module.exports = {
	NODE_ENV: '"production"',
	ENV_CONFIG: '"prod"',
  BASE_API: `"${domain.pro.base}"`,
  ADMIN_API: `"${domain.pro.admin}"`,
}
